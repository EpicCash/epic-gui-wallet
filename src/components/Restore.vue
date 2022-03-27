<template>



  <section class="hero">
    <div class="hero-body">
      <div class="container">


        <div class="columns is-centered">
          <div class="column is-8" >
            <div class="columns is-centered is-multiline">
                <img src="../assets/epiccash_logo.png" style="width:30%;height:auto;">
            </div>
            <p>&nbsp;</p>
            <h2 class="title">{{ $t('msg.restore.title') }}</h2>
            <div class="box" v-if="page==='addSeeds'">
                <p class="animated bounce has-text-weight-semibold has-text-warning"
                  style="animation-iteration-count:2;margin-bottom:12px">
                  {{ $t('msg.restore.addSeedsInfo') }} ({{seeds.length}}/{{total}})
                </p>

                <div style="min-height:130px;max-height:130px;overflow-y: scroll;">
                  <div class="tags">
                    <span class="tag is-light is-medium is-rounded is-link" v-for="item in wordList" :key="item.item">
                      <a style="color:#000000" @click="add(item)" >{{ item }}</a>
                    </span>
                    <p v-if="wordList.length == 0">
                      ...
                    </p>
                  </div>
                </div>
                <div class="field has-addons-fullwidth">

                  <div class="control">
                      <input v-model="search" placeholder="type to search words / paste seed phrase" style="width:100%;" type="text" class="input"  @keyup="keyEvent" v-on:keyup.enter="add" />
                  </div>

                </div>


                <div class="buttons is-centered">
                  <button class="button is-link is-outlined" @click="delete_">{{ $t('msg.restore.delete') }}</button>
                  <button class="button is-link is-outlined" @click="reset">{{ $t("msg.reset") }}</button>
                  <button class="button is-link is-outlined" @click="addall">{{ $t("msg.addall") }}</button>
                  <button class="button is-text" @click="toLogin">{{ $t("msg.back") }}</button>
                </div>

              <p class="has-text-weight-semibold has-text-warning"
                style="margin-bottom:12px">
                {{ $t('msg.restore.yourSeedsInfo') }}
              </p>
              <div class="tags">
                <span style="color:#000000" class="tag is-light is-medium is-rounded is-link" v-for="seed in seeds" :key="seed">{{seed}}</span>
              </div>
              <a class="button is-link is-outlined" v-show="enoughSeeds" @click="page='addPassword'">
                {{ $t('msg.restore.added') }}
              </a>
            </div>

            <div v-else-if="page==='addPassword'">

              <div class="box">
              <p class="has-text-weight-semibold has-text-warning"
                style="margin-bottom:12px">
                {{ $t('msg.restore.newPassword') }}
              </p>

                <div class="field">
                  <label class="label">{{ $t('msg.restore.walletLocation') }}</label>
                  <p class="button is-link is-success is-outlined" v-if="userHomedir != ''"><br/><strong>{{ userHomedir }}</strong></p>
                  <a class="button is-link is-outlined" @click="selectDir">{{ $t("msg.create.select") }}</a>
                </div>

                <div class="field">
                  <label class="label">{{ $t('msg.account') }}</label>
                  <div class="control">
                    <input class="input" type="text" placeholder="default" v-model="account">
                  </div>
                </div>

                <div class="field">
                  <label class="label">{{ $t('msg.restore.newPassword') }}</label>
                  <div class="control">
                    <input class="input" type="password" placeholder="********" required :class="{'is-danger': errorPassword}" v-model="password">
                  </div>
                </div>

                <div class="field">
                  <label class="label">{{ $t('msg.passwordAgain') }}</label>
                  <div class="control">
                    <input class="input" type="password" placeholder="********" required :class="{'is-danger': errorPassword}" v-model="password2">
                  </div>

                </div>

                <div class="field">
                  <label class="label">{{ $t("msg.settings.network") }}</label>
                  <div class="control">
                    <div class="select" >
                        <select v-model="network">
                          <option value="mainnet">Mainnet</option>
                          <option value="floonet">Floonet</option>
                        </select>

                    </div>
                  </div>
                </div>

                <div class="buttons is-centered">
                  <button class="button is-link" @click="initR" >{{ $t('msg.restore.recover') }}</button>
                  <button class="button is-text" @click="page='addSeeds'">{{ $t("msg.back") }}</button>
                </div>
                <p class="help is-danger" v-if="error">{{ this.errorInfo }}</p>

              </div>
            </div>

          <div v-else-if="page==='restored'">
            <p class="animated bounce has-text-weight-semibold has-text-danger is-size-5"
                style="animation-iteration-count:2;margin-bottom:40px">
                {{ $t('msg.restore.restored') }}
            </p>
            <a class="button is-link is-outlined" @click="toLogin(true)">{{ $t('msg.restore.login') }}</a>
          </div>


          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>




export default {
  name: "restore",
  data() {
    let config = this.configService.config;
    let network = config['network'] ? config['network'] : 'mainnet';


    return {
      wordList: [],
      currentSeed: '',
      enoughSeeds: false,
      seeds:[],
      password: '',
      password2: '',
      account: '',
      total: 24,
      page: 'addSeeds',
      errorPassword: false,
      errorInfoPassword: '',
      recoverErrorInfo: '',
      restoreOutputs: [],
      network: network,
      search: '',
      error: false,
      userHomedir: '',
    }
  },

  created(){

  },
  watch: {
    seeds: function(newVal){

      if(newVal.length == this.total){
        this.enoughSeeds = true
      }else{
        this.enoughSeeds = false
      }
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
    keyEvent(key){
      let value = key.target.value;
      let valueChunks = value.split(" ").map(item => item.trim());
      this.wordList = [];

      valueChunks.forEach(element => {

        if(element.length >= 2) {
          let filtered = this.mnemonicWords.filter(function (str) { return new RegExp('^' + element).test(str); });

          //if user paste more than one word then find only exact matches
          if(valueChunks.length >= 2){
            filtered = this.mnemonicWords.filter(function (str) { return new RegExp('^' + element + '$').test(str); });
          }

          //merge arrays
          this.wordList = [...this.wordList, ...filtered];

        }
      });


    },
    clearup(){
      this.enoughSeeds = false;
      this.currentSeed = '';
      this.seeds = [];
      this.password ='';
      this.password2 = '';

      this.errorPassword = false;
      this.errorInfoPassword = '';
      this.recoverErrorInfo = '';
      this.wordList = [];
      this.restoreOutputs = [];
      this.search = '';
      this.error = false;
      this.errorInfo = '';
      this.userHomedir = ''
    },

    resetErrors(){
      this.errorPassword = false;
      this.error = false;
    },
    async initR(){

      this.resetErrors()
      console.log('#############', this.userHomedir);
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
          return;
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
      }else{
        networkShortname = 'main';

      }

      if(account == 'default'){
        userhomedir = window.nodePath.join(this.userHomedir, networkShortname);
      }else{
        userhomedir = window.nodePath.join(this.userHomedir, networkShortname, account);
      }




      let recovered = await this.$walletService.recover(this.seeds.join(' '), this.password, this.network, userhomedir)

      if(recovered && recovered.success){
        if(await this.configService.updateAppConfig('account_dirs', {
            account: account,
            userhomedir: this.userHomedir,
            network: this.network,
            isdefault: false
          }) ){
          if(await this.configService.startCheck()){
            this.page = 'restored'
          }

        }else{
          this.error = true;
          this.errorInfo = 'Error update config';
        }

      }else{
        this.error = true;
        this.errorInfo = recovered.msg;
      }

      this.userHomedir = '';

    },
    add(word){
      this.seeds.push(word)

      if(this.seeds.length == this.total){
          this.enoughSeeds = true
      }else{
          this.enoughSeeds = false
      }

    },
    onlyLetters(str) {
      return /^[a-z]*$/.test(str);
    },
    delete_(){
      if(this.seeds.length > 0)this.seeds.pop()
    },
    addall(){
      this.seeds = this.wordList;
    },
    reset(){
      this.clearup()
    },
    toLogin(recovered){
      this.page = 'addSeeds';
      this.clearup();
      this.emitter.emit('toLogin', recovered);
    }
  }
}
</script>
