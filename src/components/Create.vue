<template>
  <section class="hero" >
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">

          <div v-if="walletCreated" class="column is-8" >
              <div class="columns is-centered is-multiline">
                  <img src="../assets/epiccash_logo.png" style="width:30%;height:auto;">
              </div>
              <p>&nbsp;</p>
              <h1 class="title">{{ $t('msg.create.seedPhrase') }}</h1>

              <p class="animated bounce has-text-weight-semibold has-text-warning" style="animation-iteration-count:3">
                {{ $t('msg.create.backupNote') }}
              </p>

              <br/>
              <div class="tags are-medium">
                <span class="tag" v-for="seed in seeds" :key="seed">{{seed}}</span>
              </div>
              <a class="button is-link is-outlined" @click="toLogin">{{ $t('msg.create.backupFinish') }}</a>

          </div>

          <div v-else class="column is-8" >

            <div class="columns is-centered is-multiline">
                <img src="../assets/epiccash_logo.png" style="width:30%;height:auto;">
            </div>
            <p>&nbsp;</p>
            <h2 class="title" >{{ $t("msg.create.toNewMsg") }}</h2>

            <form class="box">
              <div class="field">
                <label class="label">{{ $t('msg.restore.walletLocation') }}</label>
                <a class="button is-link is-outlined" @click="selectDir">{{ $t("msg.create.select") }}</a>
                <p class="button is-link is-success is-outlined" v-if="userHomedir != ''"><br/><strong>{{ userHomedir }}</strong></p>
              </div>
              <div class="field">
                <label class="label">{{ $t("msg.account") }}</label>
                <div class="control">
                  <input class="input" type="text" placeholder="default" :class="{'is-danger': error}" v-model="account">
                </div>

              </div>
              <div class="field">
                <label class="label">{{ $t('msg.password') }}</label>
                  <div class="control">
                    <input class="input" type="password" placeholder="********" required
                      :class="{'is-danger': error}" v-model="password">
                  </div>
                </div>
                <div class="field">
                  <label class="label">{{ $t('msg.passwordAgain') }}</label>
                  <div class="control">
                    <input class="input" type="password" placeholder="********" required
                      :class="{'is-danger': error}" v-model="password2">
                  </div>

                </div>
                <div class="field">
                  <label class="label">{{ $t("msg.settings.network") }}</label>
                  <div class="control">
                    <div class="select" >
                        <select v-model="network">
                          <option value="mainnet">Mainnet</option>
                          <option value="floonet">Floonet</option>
                          <option value="usernet">Usernet</option>
                        </select>
                    </div>
                  </div>
                </div>
                <div class="field">
                  <button class="button" @click.prevent="create" v-bind:class="{'is-loading':walletCreating}">{{ $t('msg.create.newWallet') }}</button>
                  <button class="button is-text" @click="back">{{ $t("msg.back") }}</button>
                </div>
                  <p class="help is-danger" v-if="error">{{errorInfo}}</p>
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
  name: "create",
  data() {
    let config = this.configService.config;
    let network = config['network'] ? config['network'] : 'mainnet';

    return {
      password: "",
      password2: "",
      account: "",
      network: network,
      walletCreated: false,
      walletCreating: false,
      error: false,
      errorInfo: '',
      userHomedir: '',
      seeds: []
    }
  },

  methods: {

    async selectDir(){

        this.userHomedir = '';
        let customHomedir = await window.api.showOpenDialog();

        if(customHomedir.canceled == false){
          this.userHomedir = customHomedir.filePaths[0];
        }

    },
    async create(){

      this.resetErrors()
      if(this.userHomedir == ''){
        this.error = true;
        this.errorInfo = this.$t('msg.create.selectErr');
        return
      }

      let account = this.account != '' ? this.account.trim() : 'default';
      let network = this.network;


      if(!this.onlyLetters(account)){
        this.error = true
        this.errorInfo = this.$t('msg.create.errorAccountName')
        return
      }

      for(var existingAccount in this.configService.appConfig.account_dirs){

        if(this.configService.appConfig.account_dirs[existingAccount]['account'] == account && this.configService.appConfig.account_dirs[existingAccount]['network'] == network){
          this.error = true
          this.errorInfo = this.$t('msg.create.errorAccountExist')
          return
        }
      }

      if(this.password.length == 0 ){
        this.error = true
        this.errorInfo = this.$t('msg.create.errorPasswdEmpty')
        return
      }
      if(this.password != this.password2 ){
        this.error = true
        this.errorInfo = this.$t('msg.create.errorPasswdConsistency')
        return
      }

      let userhomedir = '';
      let networkShortname = '';
      if(this.network == 'floonet'){
        networkShortname = 'floo';
      } else if(this.network == 'usernet') {
        networkShortname = 'user';
      } else {
        networkShortname = 'main';
      }

      if(account == 'default'){
        userhomedir = window.nodePath.join(this.userHomedir, networkShortname);
      }else{
        userhomedir = window.nodePath.join(this.userHomedir, networkShortname, account);
      }


      let created = await this.$walletService.new(this.password, this.network, userhomedir);
      if(created && created.success){
        console.log('created', created);

        if(await this.configService.updateAppConfig('account_dirs', {
            account: account,
            userhomedir: this.userHomedir,
            network: this.network,
            isdefault: false
          }) )
          {

          if(await this.configService.startCheck(account)){
            this.walletCreated = true
            this.seeds = created.msg.split(' ')
          }


        }else{
          this.error = true;
          this.errorInfo = 'Error update config';
        }

      }else{
        this.error = true;
        this.errorInfo = created.msg;

      }

      this.userHomedir = '';

    },
    resetErrors(){
      this.error = false;
    },
    onlyLetters(str) {
      return /^[a-z]*$/.test(str);
    },
    clearup(){
      this.password = "";
      this.password2 = "";
      this.walletCreating = false;
      this.error = false;
      this.errorInfo = '';
      this.userHomedir = '';
      this.seeds = [];
      this.walletCreated = false;
    },
    toLogin(){
      this.clearup()
      this.emitter.emit('toLogin')
    },
    back(){
      this.clearup()
      this.emitter.emit('toLogin')
    }

  }
}
</script>

<style>

</style>
