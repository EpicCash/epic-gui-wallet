<template>

  <section class="hero is-fullheight" style="background: black;">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-mobile is-centered">
          <div class="column is-6" >
            <img src="../assets/logo.png" style="width:128px" class="is-pulled-left">
            <h2 class="title" style="margin-top:24px; margin-left:70px;font-size:1.6rem" >{{ $t("msg.title") }}</h2>
          </div>
        </div>

        <div class="columns is-mobile is-centered">
          <div class="column"  v-bind:class="{'is-8': firstTime, 'is-6': !firstTime }">
            <div class="message is-warning is-small" v-show="firstTime" >
              <div class="message-header">
                <p>{{ $t("msg.welcome") }}</p>
                <button class="delete" aria-label="delete" @click="firstTime=false"></button>
              </div>
              <div class="message-body">
                <p>{{ $t("msg.login.walletExist") }}</p>
              </div>
            </div>
            <form class="box">
              <div class="field">
                <label class="label">{{ $t("msg.password") }}</label>
                <div class="control">
                  <input class="input" type="password" placeholder="********" required :class="{'is-warning': error}" v-model="password">
                </div>
                <p style="color:red;" class="help is-warning" v-if="error">{{ $t("msg.wrongPassword") }}</p>
                <p style="color:red;" class="help is-warningapi" v-if="errorapi">{{ "Error: starting api" }}</p>
              </div>

                <div class="field is-grouped">
                  <div class="control">
                    <button class="button is-link" @click.prevent="tryLogin">
                      {{ $t("msg.login_") }}
                    </button>
                  </div>
                  <div class="control">
                    <button class="button is-link" @click.prevent="openSettings">
                      {{ $t("msg.settings.title") }}
                    </button>
                  </div>
                </div>
            </form>



          </div>
        </div>

      <remove :showModal="openRemove"></remove>

      </div>
    </div>
  </section>
</template>

<script>
const log = window.log
import {checkFirstTime, isFirstTime} from '../shared/first.js'
import Remove from './Remove.vue'

export default {
  name: "login",

  components: {
    Remove
  },

  data() {
    return {
      firstTime:false,
      password: '',
      error: false,
      errorapi: false,
      openRemove: false
    }
  },
  created(){
    this.emitter.on('closeWindowRemove',()=>{this.openRemove = false})
  },
  mounted(){
    checkFirstTime();
    this.firstTime = isFirstTime();
    log.info('Login.vue: firstTime: ', this.firstTime )

  },
  methods: {
    async openSettings(){
      console.log('open settings');
      this.emitter.emit('open', 'windowSettings');
    },
    async tryLogin(){

      this.resetErrors()
      this.$walletService.setPassword(this.password);
      let loginSucccess = await this.$walletService.start();

      if(loginSucccess){

        let apiCallable = await this.$walletService.getNodeHeight();
        console.log('Login apiCallable', apiCallable.data);

        if( !apiCallable ){
          return this.errorapi = true;
        }

        this.emitter.emit('logined')

      }else{

        return this.error = true

      }


    },
    resetErrors(){
      this.error = false;
      this.errorapi = false;
    }
  }
}
</script>

<style>
</style>
