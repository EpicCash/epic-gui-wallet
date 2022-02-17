<template>

  <div class="has-background-black">
    <div class="section" v-if="ownerApiRunning" style="padding: 1.5rem 1.5rem;">
      <div class="columns">
        <div class="column is-one-quarter">

          <summary-info></summary-info>

          <div style="padding-bottom: 25px; padding-right: 0;">
            <div class="level">
              <p class="is-size-7 tag is-warning animated" v-bind:class="{headShake: isAnimate}" style="animation-iteration-count:3">
              {{ $t("msg.app.height") }}: {{height}}</p>
              &nbsp;

              <div class="dropdown is-right" v-bind:class="{'is-active':isDroppingDown3}" style="padd">
                <div class="dropdown-trigger">
                  <button class="button is-small is-warning is-outlined" aria-haspopup="true" aria-controls="dropdown-menu" @click="isDroppingDown3=!isDroppingDown3;isDroppingDown=false;isDroppingDown2=false" style="width:50px">
                    <span>{{ $t("msg.more") }}</span>
                  </button>
                </div>
                <div class="dropdown-menu" id="dropdown-menu" role="menu" style="min-width:0">
                  <div class="dropdown-content">
                    <a href="#" class="dropdown-item" style="line-height: 1.2;font-size: 0.8rem;" @click="openCheck = true">
                      {{ $t("msg.check.title") }}
                    </a>
                    <a href="#" class="dropdown-item" style="line-height: 1.2;font-size: 0.8rem;" @click="openLang=true">
                      {{ $t("msg.lang.title") }}
                    </a>
                    <a href="#" class="dropdown-item" style="line-height: 1.2;font-size: 0.8rem;" @click="openSettings=true">
                      {{ $t("msg.settings.title") }}
                    </a>

                    <hr class="dropdown-divider">
                    <a href="#" class="dropdown-item" style="line-height: 1.2;font-size: 0.8rem;" @click.prevent="logout">
                      {{ $t("msg.logout") }}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
          </aside>
        </div>

        <div class="column is-three-quarters">

          <transaction v-bind:count_per_page="3"></transaction>
          <br/>
          <commit v-bind:count_per_page="3" v-bind:nodeHeight="height"></commit>
          <receive :showModal="openReceive"></receive>
          <http-receive :showModal="openHttpReceive"></http-receive>
          <http-send :showModal="openHttpSend"></http-send>
          <file-send :showModal="openFileSend"></file-send>
          <finalize :showModal="openFinalize"></finalize>

          <check :showModal="openCheck"></check>
          <lang :showModal="openLang"></lang>
          <settings :showModal="openSettings"></settings>
        </div>
      </div> <!-- // columns -->
    </div>
    <landing v-bind:walletExist="walletExist" v-else></landing>
  </div>
</template>

<script>

const log = window.log;





import SummaryInfo from './components/SummaryInfo.vue'
import Transaction from './components/Transaction.vue'
import Commit from './components/Commit.vue'
import Receive from './components/Receive.vue'
import HttpSend from './components/HttpSend.vue'
import HttpReceive from './components/HttpReceive.vue'
import FileSend from './components/FileSend.vue'
import Finalize from './components/Finalize.vue'

import Check from './components/Check.vue'
import Lang from './components/Lang.vue'
import Settings from './components/Settings.vue'
import Landing from './components/Landing.vue'
import {locale} from './shared/config.js'

import mixin from './mixin.js'



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
    Lang,
    Settings,
    Landing
  },
    data(){
      return {
        openReceive: false,
        openHttpReceive:false,
        openHttpSend: false,
        openFileSend: false,
        openFinalize: false,
        openHedwigV1: false,
        openCheck: false,
        openLang: false,
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
        isRu: false
    }},
    async mounted() {

        this.walletExist = await this.$walletService.isExist();
        console.log('wallet exist?', this.walletExist);
        log.debug(`Render main window mounted:height ${this.height}; owner_api running? ${this.ownerApiRunning}; wallet exists? ${this.walletExist}`)

    },
    created () {

      if(locale==='ru'){
        this.isRu = true
      }
      this.emitter.on('selectLocale', (locale)=>{
        if(locale==='ru')this.isRu = true
        else{
          this.isRu = false
        }
      })
      this.emitter.on('close', (window)=>{
        if(window =='windowReceive'){
          this.openReceive = false
        }
        if(window =='windowHttpSend'){
          this.openHttpSend = false
        }
        if(window =='windowFileSend'){
          this.openFileSend = false
        }
        if(window =='windowFinalize'){
          this.openFinalize = false
        }
        if(window =='windowHttpReceive'){
          this.openHttpReceive = false
        }
        if(window =='windowHedwigV1'){
          this.openHedwigV1 = false
        }
        if(window =='windowCheck'){
          this.openCheck = false
        }
        if(window =='windowLang'){
          this.openLang = false
        }
        if(window =='windowSettings'){
          this.openSettings = false
        }
      });

      this.emitter.on('restoredThenLogin', ()=>{
        log.info('wallet restored and now to login')
        this.walletExist = true
      });

      this.emitter.on('logined', ()=>{
        log.info('app.vue got user logined event')
        this.ownerApiRunning = true
        this.getHeight()
      });

      this.emitter.on('update', () => this.getHeight());

      this.emitter.on('walletCreateFinished', ()=>{
        log.info('app.vue got walletCreateFinished event')
        this.walletExist = true
      });

      window.nodeChildProcess.on('walletExisted', () => {
        log.warn('Found walletExisted during init new one')
        this.walletExist = true
      });

      /*this.emitter.on('hedwigRunning', ()=>{
        this.hedwigRunning = true
        this.hedwigFailed = false
      })
      this.emitter.on('hedwigFailed', ()=>{
        this.hedwigRunning= false
        this.hedwigFailed = true
      })*/

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
      lang(){
        this.$i18n.locale = 'en'
      },
      getHeight(){

        this.$walletService.getNodeHeight().then(
          (res) =>{
            this.height = parseInt(res.data.result.Ok.height)
            return true;
          }).catch((error)=>{
            log.error(error)
            return false;
          })
          return false;
      },
      logout(){
        log.debug('logout')
        window.api.quit();
      },
      autoRefresh(interval){
        setInterval(()=>{
          if(this.ownerApiRunning){
            this.emitter.emit('update')
          }
        }, interval)
      },

      /*async checkNewVersion(){
        let toUpdate = await checkUpdate()
        if(toUpdate){
          this.$electron.remote.dialog.showMessageBox({
            type: 'info',
            title: this.$t('msg.app.updateTitle'),
            buttons: [this.$t('msg.app.yes'), this.$t('msg.app.no')],
            message: this.$t('msg.app.updateMsg'),
          }, (res) => {
          if (res === 0) {
            this.$electron.shell.openExternal(downloadUrl)
            log.debug('User choose to update. now quit app.')
            //window.ipcRenderer.send('quit')
          }else{
            log.info('User chosed to don not update.')
          }})
        }
      }*/
    },
  }






</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#wallet_menu {
  color: #FFFFFF;
}

#wallet_menu .menu-label {
  color: #FFDD57;
}

#wallet_menu .menu-list a {
  color: #FFFFFF;
}

#wallet_menu .menu-list a:hover {
  color: #000000;
}

.icon-running{
  background: #00aa72;
  border-color: #e5f8f1;
}
.icon-failed{
  background: #D8000C;
  border-color: #FFBABA;
}
.icon-status{
  display: inline-block;
  -webkit-border-radius: 25px;
  -moz-border-radius: 25px;
  border-radius: 25px;
  height: 15px;
  width: 15px;
  border-width: 4px;
  border-style: solid;
  margin-right: 4px;
  vertical-align: top;
}
.button.is-small2 {
    border-radius: 2px;
    font-size: 0.675rem;
}

</style>
