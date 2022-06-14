<template>
<section class="section hero is-fullheight is-dark-mode-active">
  <div class="hero-body">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-two-fifths">
          <div class="card has-card-header-background">
            <header class="card-header" style="justify-content: center;">
              <img src="../assets/img/epiccash-brand-full.png" style="width: 190px; padding: 16px 0px;">
            </header>
            <div class="card-content">

              <form @submit.prevent novalidate>
                <div class="field">
                  <label class="label">{{ $t("msg.account") }}</label>
                  <div class="control">
                    <AccountField ref="accountField" />
                  </div>
                </div>
                <div class="field">
                  <label class="label">{{ $t("msg.password") }}</label>
                  <div class="control">
                    <PasswordField ref="passwordField" />
                  </div>
                </div>
                <hr>
                <div class="field is-grouped" style="justify-content: center;">
                  <div class="control">
                    <button type="submit" class="button is-primary" :class="{ 'button__loader': isLoading }" @click.prevent="login">
                      <span class="button__text">{{ $t("msg.login_") }}</span>
                    </button>
                  </div>
                  <div class="control">
                    <a href="#" class="button is-outlined is-primary" @click.prevent="changeView('create')" >
                      {{ $t("msg.new.create") }}
                    </a>
                  </div>
                  <div class="control">
                    <a href="#" class="button is-outlined is-primary" @click.prevent="changeView('restore')" >
                      {{ $t("msg.restore.recover") }}
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="hero-foot has-text-centered">
    <div class="logo"></div>
  </div>

</section>
</template>

<script>

const log = window.log

import { ref } from 'vue';



import PasswordField from "@/components/form/passwordField";
import AccountField from "@/components/form/accountField";
import useFormValidation from "@/modules/useFormValidation";


export default {
  name: "login",
  components: {
    PasswordField,
    AccountField,
  },
  data() {
    return {

      errorapi: false,
      errorapiMsg: '',
      errorCode: '',
      isLoading: false,
      continueBtn: false,
    }
  },
  setup() {

    const errors = ref([]);
    const passwordField = ref();
    const accountField = ref();
    const canLogin = ref(true);
    const { resetFormErrors } = useFormValidation();

    return {
      errors,
      passwordField,
      accountField,
      canLogin,
      resetFormErrors,


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
        this.continueBtn = false;
    });
    
    this.emitter.on('continueLogin', () => {
       this.continueLogin(false);
    });

    this.emitter.on('continueLoginFirst', () => {
      this.continueLogin(true);
    });

  },

  methods: {

    changeView(view){
      this.emitter.emit('app.changeView', view);
    },

    async continueLogin(firstlogin){

      if(firstlogin){
        this.emitter.emit('close', 'windowSettings');
        this.emitter.emit('open', 'windowFirstrunCheck');
      }


      this.canLogin = await this.$walletService.start(this.passwordField.defaultValue, this.accountField.defaultValue, firstlogin);


      this.isLoading = false;
      if(this.canLogin){
        this.emitter.emit('app.accountLoggedIn');
      }

      /*

      this.isLoading = false;
      //we have a valid login to wallet

      if(loginSucccess){

        let nodeOnline = false;
        if(!this.continueBtn && !firstlogin){
          nodeOnline = await this.$nodeService.nodeOnline();
        }else{
          nodeOnline = true;
        }
        let apiCallable = await this.$walletService.getNodeHeight();

        if(!nodeOnline){
          this.continueBtn = true
        }

        if( !apiCallable || !nodeOnline ){
          this.isLoading = false;
          return this.errorapi = true;
        }


        if(firstlogin){

          //call txs for first wallet scan outputs
          //because a recovered wallet makes a scan on first start
          //bug if multible
          let txs = await this.$walletService.getTransactions(true, null, null);
          if(txs){
            this.emitter.emit('logined');
          }

        }else{
          this.emitter.emit('logined');
          this.continueBtn = false;
          this.errorapiMsg = '';
          this.errorCode = '';
        }
      }else{

        return this.error = true

      }*/
    },
    create(){

      this.emitter.emit('initMode', 'create');
    },
    restore(){

      this.emitter.emit('initMode', 'restore');
    },
    async login(){
      this.resetFormErrors();
      //check now requires settings
      if(this.passwordField.validInput() && this.accountField.validInput(this.configService)){

        this.isLoading = true;
        let action = await this.configService.startCheck(this.accountField.defaultValue);

        switch(action){
          case 'login':
            await this.continueLogin(false);
          break;
          case 'toml':
            await this.$walletService.newToml(this.passwordField.defaultValue);
            await this.configService.startCheck(this.accountField.defaultValue);
          break;
          case 'settings':
            this.isLoading = false;
            this.emitter.emit('open', 'windowSettings');
          break;
        }






      }else{
        return;
      }

    },

  }
}
</script>
