<template>



  <section class="hero">
    <div class="hero-body">
      <div class="container">


        <div class="columns is-centered">
          <div class="column is-8" >
            <div class="columns is-centered is-multiline">
                <img src="../assets/logo.png" style="width:30%;height:auto;">
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
                      <input v-model="search" placeholder="type to search" style="width:100%;" type="text" class="input"  @keyup="keyEvent" v-on:keyup.enter="add" />

                  </div>

                </div>




                <div class="buttons is-centered">
                  <button class="button is-link is-inverted is-outlined" @click="delete_">{{ $t('msg.restore.delete') }}</button>
                  <button class="button is-link is-inverted is-outlined" @click="reset">{{ $t("msg.reset") }}</button>
                  <button class="button is-link is-inverted is-outlined" @click="addall">{{ $t("msg.addall") }}</button>
                </div>

              <br/>
              <br/>
              <div class="tags">
                <span style="color:#000000" class="tag is-light is-medium is-rounded is-link" v-for="seed in seeds" :key="seed">{{seed}}</span>
              </div>
              <a class="button is-link is-inverted is-outlined" v-show="enoughSeeds" @click="page='addPassword'">
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
                  <p class="help is-danger" v-if="errorPassword">{{errorInfoPassword}}</p>
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
                <p style="color:red;" class="help is-warningapi" v-if="error">{{ this.recoverErrorInfo }}</p>
              </div>
            </div>

          <div v-else-if="page==='restored'">
            <p class="animated bounce has-text-weight-semibold has-text-danger is-size-5"
                style="animation-iteration-count:2;margin-bottom:40px">
                {{ $t('msg.restore.restored') }}
            </p>
            <a class="button is-link is-inverted is-outlined" @click="toLogin">{{ $t('msg.restore.login') }}</a>
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
    let account = 'default';
    return {
      wordList: [],
      currentSeed: '',
      enoughSeeds: false,
      seeds:[],
      password: '',
      password2: '',
      account: account,
      total: 24,
      page: 'addSeeds',
      errorPassword: false,
      errorInfoPassword: '',
      recoverErrorInfo: '',
      restoreOutputs: [],
      network: network,
      search: '',
      error: false
    }
  },

  created(){

  },
  watch: {
    seeds:function(newVal){

      if(newVal.length == this.total){
        this.enoughSeeds = true
      }else{
        this.enoughSeeds = false
      }
    }
  },
  methods: {

    keyEvent(key){
      let value = key.target.value;
      let valueChunks = value.split(" ").map(item => item.trim());
      this.wordList = [];

      valueChunks.forEach(element => {

        if(element.length >= 2) {
          let filtered = this.mnemonicWords.filter(function (str) { return new RegExp('^' + element).test(str); });
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
      this.page = 'addSeeds';
      this.errorPassword = false;
      this.errorInfoPassword = '';
      this.recoverErrorInfo = '';
      this.wordList = [];
      this.restoreOutputs = [];
      this.search = '';
      this.error = false;
    },

    resetErrors(){
      this.errorPassword = false;
      this.error = false;
    },
    async initR(){

      this.resetErrors()
      if(this.password.length == 0 ){
        this.errorPassword = true
        this.errorInfoPassword = this.$t('msg.create.errorPasswdEmpty')
        return
      }

      if(this.password != this.password2 ){
        this.errorPassword = true
        this.errorInfoPassword = this.$t('msg.create.errorPasswdConsistency')
        return
      }

      let userhomedir = '';
      if(this.network == 'floonet'){
        userhomedir = window.nodePath.join(this.configService.userhomedir, 'floo', this.account);
      }else{
        userhomedir = window.nodePath.join(this.configService.userhomedir, 'main', this.account);
      }

      let recovered = await this.$walletService.recover(this.seeds.join(' '), this.password, this.network, userhomedir)
      if(recovered && recovered.success){
        if(await this.configService.updateAppConfig('account_dirs', {
            account: this.account,
            userhomedir: this.configService.userhomedir,
            network: this.network,
            isdefault: true
          }) ){
          if(await this.configService.startCheck()){
            this.page = 'restored'
          }

        }else{
          this.error = true;
          this.recoverErrorInfo = 'Error update config';
        }

      }else{
        this.error = true;
        this.recoverErrorInfo = recovered.msg;
      }

    },
    add(word){
      this.seeds.push(word)

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
    toLogin(){
      this.clearup()
      this.emitter.emit('restoredThenSettings')
    }
  }
}
</script>
