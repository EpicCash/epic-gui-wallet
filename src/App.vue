<template>

  <div  v-show="!checkservice">
  <settings :showModal="openSettings" :config="config" :key="resetKey"></settings>


  <div class="columns ">

    <div class="column is-half">
      <div v-if="ownerApiRunning" class="hero-head" style="padding: 1.5rem;">
        <figure  class="image ">
          <img src="./assets/epiccash_logo.png" style="width:36%;height:auto;">
        </figure>
      </div>

    </div>
    <div class="column">

        <div v-if="userLoggedIn"  class="hero-head nodeInfo">

          Node ({{ this.epicNode }}):
          <span v-if="nodeOnline && nodeIsSync" class="dotGreen"></span><span v-if="nodeOnline && nodeIsSync">&nbsp;online</span>
          <span v-if="nodeOnline && nodeIsSync == false" class="dotYellow"></span><span v-if="nodeOnline && nodeIsSync == false">&nbsp;syncing</span><span v-if="nodeOnline && nodeIsSync == false">&nbsp;{{ sync_status }}&nbsp;{{ current_height}}/{{ highest_height}}</span>
          <span v-if="nodeOnline == false" class="dotRed"></span><span v-if="nodeOnline==false">&nbsp;offline</span>

          <span v-if="walletListen" class="walletListenInfo" >{{ $t("msg.app.httpReceive") }}
            <span v-if="nodeOnline" class="dotGreen"></span>
          </span>
          <span>&nbsp;&nbsp;</span>
          <span v-if="ownerApiRunning" class="is-small tag is-warning is-rounded animated" v-bind:class="{headShake: isAnimate}" style="animation-iteration-count:3">
          {{ $t("msg.app.height") }}: {{height}}</span>&nbsp;
          <button class="button is-small is-rounded" @click="openWalletSettings">
            <font-awesome-icon :icon="['fas', 'gear']"/>
          </button>
        </div>

    </div>
  </div>

    <div class="section" v-if="ownerApiRunning" style="padding: 1.5rem 1.5rem;">


      <div class="columns">
        <div class="column is-one-quarter">

          <summary-info></summary-info>


          <aside class="menu" id="wallet_menu">
            <p class="menu-label">{{ $t("msg.send") }}</p>
            <ul class="menu-list">
              <li><a href="#" class="dropdown-item" @click="openFileSend = true">{{ $t("msg.app.create") }}</a></li>
              <li><a href="#" class="dropdown-item" @click="openFinalize = true">{{ $t("msg.app.finalize") }}</a></li>
              <li><a class="dropdown-item" @click="openHttpSend = true">{{ $t("msg.app.httpSend") }}</a></li>
            </ul>
            <p class="menu-label"> {{ $t("msg.receive") }} </p>
            <ul class="menu-list">
              <li><a href="#" class="dropdown-item" @click="openReceive = true">{{ $t("msg.app.createRespFile") }}</a></li>
              <li><a class="dropdown-item" @click="openHttpReceive = true">{{ $t("msg.app.httpReceive") }}</a></li>
            </ul>
            <p class="menu-label"> Misc</p>
            <ul class="menu-list">
              <li><a href="#" class="dropdown-item" @click="openCheck = true">{{ $t("msg.check.title") }}</a></li>
              <li><a href="#" class="dropdown-item" @click="openSeed = true">{{ $t("msg.seed.mnemonic") }}</a></li>
              <li><a href="#" class="dropdown-item" @click="openSettings = true">{{ $t("msg.settings.title") }}</a></li>
            </ul>

            <p class="menu-label">Account</p>
            <ul class="menu-list">
              <li><a href="#" class="dropdown-item"  @click.prevent="showProofAddress" >
                Proof Address
              </a>
              </li>
              <li>
              <a href="#" class="dropdown-item" @click.prevent="logout" >
                {{ $t("msg.logout") }}<span v-if="isLoading"><font-awesome-icon :icon="['fas', 'spinner']"/>&nbsp;</span>
              </a>
              </li>
            </ul>

          </aside>
        </div>

        <div class="column is-three-quarters">

          <div class="tabs is-boxed">
            <ul>
              <li v-bind:class="{'is-active':transactionTab}"><a @click="openTab('transactionTab')">Transactions</a></li>
              <li v-bind:class="{'is-active':commitTab}"><a @click="openTab('commitTab')">Outputs</a></li>
            </ul>
          </div>

          <div v-if="transactionTab" class="content-tab" >
            <transaction v-bind:count_per_page="10"></transaction>
          </div>
          <div v-if="commitTab" class="content-tab" >
            <commit v-bind:count_per_page="10" v-bind:nodeHeight="height"></commit>
          </div>


        </div>



      </div> <!-- // columns -->
    </div>

    <login v-show="!checkservice && !ownerApiRunning && action == 'login'"></login>

  </div>
  <receive :showModal="openReceive"></receive>
  <http-receive :showModal="openHttpReceive" :onion-address="onionAddress"></http-receive>
  <http-send :showModal="openHttpSend"></http-send>
  <file-send :showModal="openFileSend"></file-send>
  <finalize :showModal="openFinalize"></finalize>


  <seed :showModal="openSeed"></seed>
  <check :showModal="openCheck"></check>
  <checkService v-show="action === 'check'"></checkService>
  <create v-show="action === 'create'"></create>
  <restore v-show="action === 'restore'"></restore>
  <new v-show="action === 'init'"></new>
  <message :showMsg="openProofAddressMsg" v-on:close="openProofAddressMsg = false" v-bind:msg=proofAddressMsg msgType="link"></message>

</template>

<script>

const log = window.log;
const clipboard = window.clipboard;

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSpinner, faGear } from '@fortawesome/free-solid-svg-icons'
library.add(faSpinner, faGear)


import CheckService from './components/CheckService.vue'
import SummaryInfo from './components/SummaryInfo.vue'
import Transaction from './components/Transaction.vue'
import Commit from './components/Commit.vue'
import Receive from './components/Receive.vue'
import HttpSend from './components/HttpSend.vue'
import HttpReceive from './components/HttpReceive.vue'
import FileSend from './components/FileSend.vue'
import Finalize from './components/Finalize.vue'

import New from './components/New.vue'
import Restore from './components/Restore.vue'
import Create from './components/Create.vue'
import Login from './components/Login.vue'


import Check from './components/Check.vue'
import Seed from './components/Seed.vue'
import Settings from './components/Settings.vue'

import Message from './components/Message.vue'

import mixin from './mixin.js'
import { useI18n } from 'vue-i18n/index'

export default {
  name: 'App',
  mixins: [mixin],
  components: {
    SummaryInfo,
    Transaction,
    Commit,
    Receive,
    HttpSend,
    HttpReceive,
    FileSend,
    Finalize,
    Check,
    Seed,
    Settings,
    FontAwesomeIcon,
    CheckService,
    New,
    Restore,
    Create,
    Login,
    Message
  },
    data(){
      return {
        checkservice: false,
        openReceive: false,
        openHttpReceive:false,
        openHttpSend: false,
        openFileSend: false,
        openFinalize: false,
        openCheck: false,
        openSeed: false,
        openSettings: false,
        isDroppingDown: false,
        isDroppingDown2: false,
        isDroppingDown3: false,
        ownerApiRunning: false,
        height:null,
        isAnimate:false,
        walletExist:false,
        isRu: false,
        nodeOnline: false,
        nodeIsSync: false,
        epicNode: '',
        walletListen: false,
        address: '',
        onionAddress: '',
        showCopyAddress: true,
        error: '',
        action: '',
        current_height: 0,
        highest_height: 0,
        sync_status: '',
        transactionTab:true,
        commitTab:false,
        userLoggedIn: false,
        isLoading: false,
        config: {},
        resetKey: 0,
        openProofAddressMsg: false,
        proofAddressMsg: '',
        refresh: undefined,


    }},
    setup () {
      const { locale } = useI18n()
      return {
        locale
      }
    },
    async mounted() {
      console.log('app mounted');
      this.clearup();
      window.api.resize(1160, 850);
      this.checkAccountOnStart();

    },
    created () {

      this.emitter.on('initMode', (action) => {
        console.log(action);
        this.action = action;
      })

      this.emitter.on('selectLocale', (locale)=>{
        this.locale = locale;
      })
      this.emitter.on('close', (window)=>{
        if(window == 'windowReceive'){
          this.openReceive = false
        }
        if(window == 'windowHttpSend'){
          this.openHttpSend = false
        }
        if(window == 'windowFileSend'){
          this.openFileSend = false
        }
        if(window == 'windowFinalize'){
          this.openFinalize = false
        }
        if(window == 'windowHttpReceive'){
          this.openHttpReceive = false
        }
        if(window == 'windowCheck'){
          this.openCheck = false
        }
        if(window == 'windowSeed'){
          this.openSeed = false
        }
        if(window == 'windowSettings'){
          this.openSettings = false
        }
      });

      this.emitter.on('open', (window)=>{
        if(window == 'windowSettings'){
          this.openWalletSettings();
        }
      });
      this.emitter.on('restartNode', async ()=>{
        let nodeRestarted = await this.$nodeService.reconnectNode();
        this.epicNode = this.configService.config['check_node_api_http_addr'];
        this.getNode();
      });

      this.emitter.on('toLogin', ()=>{
        this.checkAccountOnStart();
      });


      this.emitter.on('logined', async()=>{
        log.info('app.vue got user logined event')

        this.openSettings = false;
        this.ownerApiRunning = true;
        this.isLoading = false;
        this.userLoggedIn = true;

        this.config = this.configService.config;
        this.getAddress();
        this.epicNode = this.configService.config['check_node_api_http_addr'];
        this.getNode();
        this.getHeight();


      });

      this.emitter.on('updateNode', () => {
        console.log('emit on update', this.nodeOnline);
        if(this.nodeOnline && this.userLoggedIn){
          this.getNode();
          this.getHeight();
        }
      });

      this.emitter.on('walletListen', ()=>{
        this.walletListen = this.$walletService.isListen();
      });


      this.emitter.on('update', ()=>{


          this.emitter.emit('updateSummary');
          this.emitter.emit('updateNode');
          this.emitter.emit('updateCommits');
          this.emitter.emit('updateTxs');


      });

    },

    watch: {
      isDroppingDown:function(newVal){
        if(newVal){
          setTimeout(
            ()=>{
              this.isDroppingDown = false},
            5*1000)
        }
      },
      isDroppingDown2:function(newVal){
        if(newVal){
          setTimeout(
            ()=>{
              this.isDroppingDown2 = false},
            5*1000)
        }
      },
      isDroppingDown3:function(newVal){
        if(newVal){
          setTimeout(
            ()=>{
              this.isDroppingDown3 = false},
            5*1000)
        }
      },
      ownerApiRunning:function(newVal){
        if(newVal){
          this.autoRefresh((2*60)*1000)
        }
      },
      height: function(){
        this.isAnimate = true
        setTimeout(()=>{this.isAnimate = false}, 1000)
      }
    },
    methods: {
      showProofAddress(){

        this.openProofAddressMsg = true;
        this.proofAddressMsg = this.address;
      },
      clearup(){
        this.nodeOnline = false;
        this.ownerApiRunning = false;
        this.userLoggedIn = false;

      },
      openWalletSettings(){
        this.resetKey += 1;
        this.openSettings=true;
        this.config = this.configService.config;
      },



      async checkAccountOnStart(){

        if(await this.configService.killWalletProcess()){
          if(this.configService.appHasAccounts()){
            console.log('app has accounts', this.configService.appConfig);
            this.checkservice = false;
            this.ownerApiRunning = false;
            this.action = 'login';
          }else{
            this.checkservice = false;
            this.action = 'init';
          }
        }

      },
      openTab(tabName) {
          if(tabName == 'transactionTab'){
            this.transactionTab = true;
            this.commitTab = false;
          }else{
            this.transactionTab = false;
            this.commitTab = true;
          }
      },


      copyAdress(){
        clipboard.writeText(this.address);
        this.showCopyAddress = false;
        setTimeout(()=> {
          this.showCopyAddress = true;
        }, 2000)


      },


      async getAddress(){
        let addressRes = await this.$walletService.getPubliProofAddress();
        if(addressRes.result.Ok){

          this.address = addressRes.result.Ok;

          if(this.address != ''){
            this.onionAddress = window.config.getOnionV3(this.address);
          }

        }
      },

      async getNode(){
        this.nodeOnline = await this.$nodeService.nodeOnline();
        console.log('async getNode', this.nodeOnline);
        if(this.nodeOnline.sync_info){
          this.current_height = this.nodeOnline.sync_info.current_height
          this.highest_height = this.nodeOnline.sync_info.highest_height

        }
        if(this.nodeOnline.sync_status == 'no_sync'){
          this.nodeIsSync = true;
        }else{
          this.nodeIsSync = false;
        }

        switch(this.nodeOnline.sync_status){
          case 'header_sync':
            this.sync_status = 'Block Headers'
          break;
          case 'body_sync':
            this.sync_status = 'Block Bodies'
          break;
        }


      },

      lang(){
        this.$i18n.locale = 'en'
      },

      getHeight(){

        this.$walletService.getNodeHeight().then(
          (res) =>{

            this.height = parseInt(res.result.Ok.height)
            return true;
          }).catch((error)=>{
            log.error(error)
            return false;
          })
          return false;
      },

      logout(){
        this.isLoading = true;
        this.$walletService.logoutClient();
        this.userLoggedIn = false;
        this.emitter.emit('toLogin');
      },


      autoRefresh(interval){

        if(this.refresh != undefined){
          clearInterval(this.refresh);
        }
        this.refresh = setInterval(()=>{

          if(this.ownerApiRunning && this.userLoggedIn){
            this.emitter.emit('update');
          }
        }, interval)


      },
    },
  }


</script>
