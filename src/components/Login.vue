<template>

  <section class="hero is-fullheight" style="background: black;">
    <div class="hero-body">
      <div class="container">

        <div class="columns is-centered is-multiline">
          <div class="block">
            <img src="../assets/logo.png" style="width:20%;height:auto;">
            <h2 class="title" style="margin-top:24px; margin-left:70px;font-size:1.6rem" >{{ $t("msg.title") }}</h2>
          </div>
        </div>

        <div class="columns is-centered">
          <div class="column is-6" >

            <form class="box">
              <div class="field">
                <label class="label">{{ $t("msg.account") }}</label>
                <div class="control">
                  <input class="input" type="account" placeholder="default" required :class="{'is-danger': error}" v-model="account">
                </div>

              </div>
              <div class="field">
                <label class="label">{{ $t("msg.password") }}</label>
                <div class="control">
                  <input class="input" type="password" placeholder="********" required :class="{'is-danger': error}" v-model="password">
                </div>
                <p style="color:red;" class="help is-warning" v-if="error">{{ $t("msg.wrongPassword") }}</p>
                <p style="color:red;" class="help is-warningapi" v-if="errorapi">{{ this.errorapiMsg }}</p>
                <p class="help is-warningapi" v-if="errorapi">Code: {{ this.errorCode }}</p>
              </div>

                <div class="field is-grouped">
                  <div class="control">
                    <button class="button is-link" @click.prevent="login">
                      {{ $t("msg.login_") }}
                    </button>
                  </div>
                  <div class="control">

                    <button class="button is-link" @click.prevent="create">
                      {{ $t("msg.new.create") }}
                    </button>
                  </div>
                </div>
            </form>



          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script>
const log = window.log

export default {
  name: "login",

  data() {
    return {
      password: '',
      account: '',
      error: false,
      errorapi: false,
      errorapiMsg: '',
      errorCode: '',
    }
  },
  created(){
    this.emitter.on('wallet_error', ({msg, code})=>{
        this.errorapi = true;
        this.errorapiMsg = msg;
        this.errorCode = code;
    });
  },

  methods: {
    create(){
      console.log('new create');
      this.emitter.emit('initMode', 'create');
    },
    async login(){

      this.resetErrors()

      let loginSucccess = await this.$walletService.start(this.password, this.account);
      this.password = '';
      this.account = '';


      if(loginSucccess){

        let apiCallable = await this.$walletService.getNodeHeight();

        console.log('Login apiCallable', apiCallable);

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
