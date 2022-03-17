<template>

<div class="modal" :class="{'is-active': showModal}">
  <div class="modal-background" @click="closeModal"></div>
  <div class="modal-card" >
    <header class="modal-card-head">
      <p class="modal-card-title is-size-4 has-text-link has-text-weight-semibold">{{ $t("msg.receive") }} (HTTP/HTTPS)</p>
      <button class="delete" aria-label="close" @click="closeModal"></button>
    </header>

    <section class="modal-card-body" >
      <div v-if="running">
        <div class="message is-link">
          <div class="message-header" v-if="started"><p>{{ $t("msg.httpReceive.launchSucess") }}</p></div>
          <div class="message-header" v-else><p>{{ $t("msg.httpReceive.listening") }}</p></div>
          <div class="message-body">
            <p>{{ $t("msg.httpReceive.address") }} :</p>
            <p class="has-text-weight-semibold is-size-4" style="margin-top:15px;margin-bottom:15px">
              &nbsp; &nbsp; http://{{ip}}:3415 </p>
            <p>{{ $t("msg.httpReceive.reachableMsg2") }}</p>
          </div>


        </div>
        <button class="button is-link is-outlined"  @click="closeModal" >ok</button>
        &nbsp;&nbsp;
        <button class="button is-link" v-bind:class="{'is-loading': stopping }" @click="stop" v-show="!started">
          {{ $t("msg.httpReceive.close") }}
        </button>

      </div>
      <div v-else>


        <div class="notification is-warning" v-if="errors.length">
          <p v-for="error in errors" :key="error">{{ error }}</p>
        </div>
        <div class="center" v-show="errors.length>0">
          <a class="button is-link is-outlined" v-if="errors.length" @click="closeModal">OK</a>
        </div>

        <div v-show="errors.length==0">
          <div class="message is-warning">
            <div class="message-header"><p>{{ $t("msg.httpReceive.attention") }}</p></div>
            <div class="message-body">
              <p>{{ $t("msg.httpReceive.reachableMsg") }}</p>
            </div>
          </div>


          <div class="field is-horizontal">
            <div class="field-label is-normal"><label class="label">{{ $t("msg.password") }}</label></div>
            <div class="field-body">

              <input class="input" type="password" placeholder="********" required v-model="password" :class="{'is-danger': error}">

            </div>
          </div>

          <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Method</label>
            </div>
            <div class="field-body">
                  <div class="select">
                    <select v-model="method">
                      <option value="http">Http</option>
                      <option value="keybase">Keybase</option>
                    </select>
                  </div>
            </div>
          </div>

          <div class="field is-horizontal">
            <div class="field-label">
              <label class="label">TOR</label>
            </div>
            <div class="field-body">
                  <label class="checkbox">
                    <input type="checkbox" name="tor" v-model="tor">
                    enable
                  </label>
            </div>
          </div>

          <div class="field is-horizontal">
            <div class="field-label">
              <label class="label">TOR Onion address</label>
            </div>
            <div class="field-body">
            <span v-if="onionAddress" class="" >
              <button class="button is-small is-rounded">{{ onionAddress }}</button>
              &nbsp;<span @click="copyOnionAdress()"><font-awesome-icon :icon="['fas', 'copy']"/></span>
              <span v-if="!showCopyOnionAddress">&nbsp;{{ $t("msg.commit.copied") }}</span>
            </span>
            </div>
          </div>


          <p>&nbsp;</p>
          <p>&nbsp;</p>
          <div class="center">

            <div class="field is-grouped ">
              <div class="control">
                <button class="button is-link" @click="start">
                  {{ $t("msg.httpReceive.start") }}<span v-if="starting"><font-awesome-icon :icon="['fas', 'spinner']"/>&nbsp;</span>
                </button>
              </div>
              <div class="control">
                <button class="button is-text" @click="closeModal">{{ $t("msg.cancel") }}</button>
              </div>
            </div>

          </div>
          <div class="center">
            <p class="help is-danger" v-if="error">{{errorInfo}}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</div>

</template>
<script>

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
library.add(faSpinner)



const log = window.log
const clipboard = window.clipboard;

export default {
  name: "http-receive",
  components: {
    FontAwesomeIcon
  },
  props: {
    showModal: {
      type: Boolean,
      default: false
    },
    onionAddress: String
  },
  data() {
    return {
      errors: [],
      starting: false,
      stopping: false,
      started: false,
      localReachable: false,
      running: false,
      password: '',
      method: 'http',
      tor: false,
      ip: this.$t('msg.httpReceive.ip'),
      showCopyOnionAddress: true,
      error: false
    }
  },
  methods: {

    copyOnionAdress(){
      clipboard.writeText(this.onionAddress);
      this.showCopyOnionAddress = false;
      setTimeout(()=> {
        this.showCopyOnionAddress = true;
      }, 2000)


    },
    async start(){

      this.clearup();

      if(this.password.length == 0 ){
        this.error = true
        this.errorInfo = this.$t('msg.create.errorPasswdEmpty')
        return
      }

      if(!this.starting && !this.running){

        this.starting = true
        const isListen = await this.$walletService.startListen(this.password, this.tor, this.method);

        if(isListen.success){

          this.started = true
          this.running = true
          log.debug('Http listen is locally reachable.')
          this.emitter.emit('walletListen')

        }else if(isListen.success == false){

          this.starting = false;
          this.error = true;
          this.errorInfo = isListen.msg;

        }

      }
      this.password = '';


    },
    async stop(){

      this.stopping = true;
      let killed = await this.$walletService.stopProcess('listen')
      if(killed){
        this.running = false
        this.emitter.emit('walletListen')
        this.clearup();
        this.closeModal()
      }
    },

    closeModal() {
      this.clearup()
      this.emitter.emit('close', 'windowHttpReceive');
    },

    clearup(){
      this.errors = [];
      this.errorInfo = '';
      this.error = false;
      this.starting = false;
      this.stopping = false;
      this.started = false;

    },

  }
}
</script>
<style>
.center{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
