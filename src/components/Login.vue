<template>

  <section class="hero">
    <div class="hero-body">
      <div class="container">

        <div class="columns is-centered">
          <div class="column is-6">
            <div class="block" >
              <div class="card-image has-text-centered">
                <figure class="image is-inline-block">
                  <img src="../assets/epiccash_logo.png" style="width:36%;height:auto;">
                </figure>
              </div>
              <h2 class="title" style="margin-top:24px; margin-left:70px;font-size:1.6rem" >{{ $t("msg.title") }}</h2>
            </div>
          </div>
        </div>

        <div class="columns is-centered">
          <div class="column is-6" >

            <form class="box">
              <div class="field">
                <label class="label">{{ $t("msg.account") }}</label>
                <div class="control">
                  <input class="input" type="account" placeholder="default" required :class="{'is-danger': error}" v-model="account">
                  <p style="color:red;" class="help is-warning" v-if="errorAccount">Account does not exist</p>
                </div>

              </div>
              <div class="field">
                <label class="label">{{ $t("msg.password") }}</label>
                <div class="control">
                  <input class="input" type="password" placeholder="********" required :class="{'is-danger': error}" v-model="password">
                </div>
                <p style="color:red;" class="help is-warning" v-if="error">{{ $t("msg.wrongPassword") }}</p>
                <p style="color:red;" class="help is-warning" v-if="errorEmpty">{{ $t("msg.login.errorPasswdEmpty") }}</p>
                <p style="color:red;" class="help is-warningapi" v-if="errorapi">{{ this.errorapiMsg }}</p>
                <p class="help is-warningapi" v-if="errorapi">Code: {{ this.errorCode }}</p>
              </div>

                <div class="field is-grouped">
                  <div class="control">
                    <button class="button" @click.prevent="login">
                      {{ $t("msg.login_") }}<span v-if="isLoading"><font-awesome-icon :icon="['fas', 'spinner']"/>&nbsp;</span>
                    </button>
                  </div>
                  <div class="control">

                    <button class="button" @click.prevent="create">
                      {{ $t("msg.new.create") }}
                    </button>
                  </div>
                  <div class="control">

                    <button class="button" @click.prevent="restore">
                      {{ $t("msg.restore.recover") }}
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

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSpinner, faGear } from '@fortawesome/free-solid-svg-icons'
library.add(faSpinner, faGear)

const log = window.log

export default {
  name: "login",
  components: {
    FontAwesomeIcon
  },
  data() {
    return {
      password: '',
      account: '',
      error: false,
      errorEmpty: false,
      errorapi: false,
      errorapiMsg: '',
      errorCode: '',
      errorAccount: false,
      isLoading: false,
    }
  },

  created(){


    this.emitter.on('wallet_error', ({msg, code})=>{
        this.errorapi = true;
        this.errorapiMsg = msg;
        this.errorCode = code;
    });
    this.emitter.on('wallet_error_clean',()=>{
        this.errorapi = false;
        this.errorapiMsg = '';
        this.errorCode = '';
    });
    this.emitter.on('continueLogin', () => {
       this.continueLogin(false);
    });


    this.emitter.on('continueLoginFirst', () => {
      console.log('continueLoginFirst');
      this.continueLogin(true);
    });

  },

  methods: {
    async continueLogin(firstlogin){

      let account = this.account ? this.account : 'default';
      let loginSucccess = await this.$walletService.start(this.password, account);
      this.password = '';
      this.account = '';
      account = '';
      this.isLoading = false;
      //we have a valid login to wallet
      if(loginSucccess){

        let apiCallable = await this.$walletService.getNodeHeight();

        console.log('Login apiCallable', apiCallable);

        if( !apiCallable ){
          this.isLoading = false;
          return this.errorapi = true;
        }

        if(firstlogin){
          console.log('after api start this is firstlogin');
          //call txs for first wallet scan outputs
          //because a recovered wallet makes a scan on first start
          //bug if multible
          let txs = await this.$walletService.getTransactions(true, null, null);
          if(txs){
            this.emitter.emit('logined');
          }

        }else{
          this.emitter.emit('logined');
        }



      }else{

        return this.error = true

      }
    },
    create(){
      console.log('new create');
      this.emitter.emit('initMode', 'create');
    },
    restore(){
      console.log('restore');
      this.emitter.emit('initMode', 'restore');
    },
    async login(){

      this.resetErrors()
      //check if acount exist.
      let account = this.account ? this.account : 'default';


      if(this.password.length == 0 ){
        this.errorEmpty = true
        return
      }

      if(this.configService.accountExist(account)){

        //check now requires settings
        this.isLoading = true;
        let action = await this.configService.startCheck(account, true);
        if(action === 'settings'){
          this.isLoading = false;
          this.emitter.emit('open', 'windowSettings');
        }else{

          await this.continueLogin(false);

        }



      }else{
        return this.errorAccount = true;
      }


    },
    resetErrors(){
      this.error = false;
      this.errorapi = false;
      this.errorAccount = false;
      this.errorEmpty = false;
      this.isLoading = false;
    }
  }
}
</script>
