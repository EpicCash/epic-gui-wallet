<template>

  <div  v-if="!checkservice">
  <settings :showModal="openSettings"></settings>


  <div class="columns ">

    <div class="column is-half">
      <div v-if="ownerApiRunning" class="hero-head" style="padding: 1.5rem;">
        <figure  class="image ">
          <img src="./assets/epiccash_logo.png" style="width:36%;height:auto;">
        </figure>
      </div>
      <!-- p class="addressInfo">
        <span v-if="address" class="" >Proof address: <button class="button is-small is-rounded">{{ address }}</button>
          &nbsp;<span @click="copyAdress()">

              <font-awesome-icon :icon="['fas', 'copy']"/>

          </span>
          <span v-if="!showCopyAddress">&nbsp;{{ $t("msg.commit.copied") }}</span>
        </span>
      </p -->

    </div>
    <div class="column">

        <div class="hero-head nodeInfo">

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
          <button class="button is-small is-rounded" @click="openSettings=true">
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
              <li><a href="#" class="dropdown-item" @click.prevent="logout">
                {{ $t("msg.logout") }}
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

    <login v-if="!checkservice && !ownerApiRunning && action == 'login'"></login>

  </div>
  <receive :showModal="openReceive"></receive>
  <http-receive :showModal="openHttpReceive" :onion-address="onionAddress"></http-receive>
  <http-send :showModal="openHttpSend"></http-send>
  <file-send :showModal="openFileSend"></file-send>
  <finalize :showModal="openFinalize"></finalize>


  <seed :showModal="openSeed"></seed>
  <check :showModal="openCheck"></check>
  <checkService v-if="action === 'check'"></checkService>
  <create v-if="action === 'create'"></create>
  <restore v-if="action === 'restore'"></restore>
  <new v-if="action === 'init'"></new>


</template>

<script>

const log = window.log;
const clipboard = window.clipboard;

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGear as FasGear } from '@fortawesome/free-solid-svg-icons'
library.add(FasGear)


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
    Login
  },
    data(){
      return {
        checkservice: true,
        openReceive: false,
        openHttpReceive:false,
        openHttpSend: false,
        openFileSend: false,
        openFinalize: false,
        openHedwigV1: false,
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
        hedwigRunning:false,
        hedwigFailed:false,
        isRu: false,
        nodeOnline: false,
        nodeIsSync: false,
        epicNode: '',
        walletListen: false,
        address: '',
        onionAddress: '',
        showCopyAddress: true,
        error: '',
        action: 'check',
        current_height: 0,
        highest_height: 0,
        sync_status: '',
        transactionTab:true,
        commitTab:false
    }},
    setup () {
      const { locale } = useI18n()
      return {
        locale
      }
    },
    async mounted() {

        this.action = await this.configService.startCheck();
        this.locale = this.configService.config.locale;

        if(this.action === 'settings'){
          console.log('open settings now');
          this.checkservice = false;
          this.openSettings = true;

        }

        if(this.action === 'login'){
          this.checkservice = false;
          //check first if node is online
          this.epicNode = this.configService.config['check_node_api_http_addr'];
          this.getNode();
          log.debug(`Render main window mounted:height ${this.height}; owner_api running? ${this.ownerApiRunning}; wallet exists? `)

        }

    },
    created () {

      this.emitter.on('initMode', (action)=>{
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
        if(window == 'windowHedwigV1'){
          this.openHedwigV1 = false
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
          console.log('emit open settings');
          this.openSettings = true
        }
      });
      this.emitter.on('restartNode', async ()=>{

        let nodeRestarted = await this.$nodeService.reconnectNode();
        this.emitter.emit('wallet_error_clean');
        this.epicNode = this.configService.config['check_node_api_http_addr'];
        this.getNode();



      });
      this.emitter.on('restoredThenSettings', async ()=>{
        log.info('wallet restored and now to login');

        this.$walletService.logoutClient();
        await this.configService.killWalletProcess();
        await this.$nodeService.reconnectNode();

        this.ownerApiRunning = false;
        this.action = 'settings';
        this.openSettings = true;
        this.checkservice = false;
      });

      this.emitter.on('restoredThenLogin', ()=>{
        log.info('wallet restored and now to login');




        this.action = 'login';
        this.openSettings = false;
        this.checkservice = false;
      });

      this.emitter.on('logined', ()=>{
        log.info('app.vue got user logined event')
        this.ownerApiRunning = true
        this.getHeight()
        this.getAddress()
      });

      this.emitter.on('update', () => {
        console.log('emit on update');
        this.getNode();
        this.getHeight();

      });

      this.emitter.on('walletListen', ()=>{
        this.walletListen = this.$walletService.isListen();
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
          //window.ipcRenderer.send('resize', 1160, 850)

          this.autoRefresh(60*2.5*1000)
        }else{
          //window.ipcRenderer.send('resize', 1160, 850)
        }
      },
      height: function(){

        this.isAnimate = true
        setTimeout(()=>{this.isAnimate = false}, 1000)
      }
    },
    methods: {

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
      async logout(){
        log.debug('logout');
        this.$walletService.logoutClient();
        await this.configService.killWalletProcess();
        await this.$nodeService.reconnectNode();
        this.action = 'login';
        this.ownerApiRunning = false;




      },
      autoRefresh(interval){
        setInterval(()=>{
          if(this.ownerApiRunning){
            this.emitter.emit('update')
          }
        }, interval)
      },
    },
  }


</script>
