<template>
  <section class="hero is-fullheight" style="background: black;">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-mobile is-centered">
          <div v-if="walletCreated" class="column is-10" >

            <h1 class="title">{{ $t('msg.create.seedPhrase') }}</h1>

              <p class="animated bounce has-text-weight-semibold has-text-warning" style="animation-iteration-count:3">
                {{ $t('msg.create.backupNote') }}
              </p>

              <br/>
              <div class="tags are-medium">
                <span class="tag" v-for="seed in seeds" :key="seed">{{seed}}</span>
              </div>
              <a class="button is-link is-inverted is-outlined" @click="toLogin">{{ $t('msg.create.backupFinish') }}</a>
              
          </div>

          <div v-else class="column is-8" >

            <div class="columns is-centered is-multiline">
              <div class="block">
                <img src="../assets/logo.png" style="width:20%;height:auto;">
                <h2 class="title" style="margin-top:24px; margin-left:70px;font-size:1.6rem" >{{ $t("msg.create.toNewMsg") }}</h2>
              </div>
            </div>

            <form class="box">
              <div class="field">
                <label class="label">{{ $t("msg.account") }}</label>
                <div class="control">
                  <input class="input" type="account" placeholder="" required :class="{'is-danger': error}" v-model="account">
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
                        </select>
                    </div>
                  </div>
                </div>
                <div class="field">
                  <button class="button is-link" @click.prevent="create" v-bind:class="{'is-loading':walletCreating}">{{ $t('msg.create.newWallet') }}</button>
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
      seeds: []
    }
  },
  methods: {
    async create(){

      this.resetErrors()
      if(this.account.length == 0 ){
        this.error = true
        this.errorInfo = this.$t('msg.create.errorAccountEmpty')
        return
      }else{
        var self = this;
        this.configService.appConfig.account_dirs.forEach(function(existingAccount){

          if(existingAccount['account'] == self.account && existingAccount['network'] == self.network){
            self.error = true
            self.errorInfo = self.$t('msg.create.errorAccountExist')
            return
          }

        });
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
      if(this.network == 'floonet'){
        userhomedir = window.nodePath.join(this.configService.userhomedir, 'floo', this.account);
      }else{
        userhomedir = window.nodePath.join(this.configService.userhomedir, 'main', this.account);
      }


      let created = await this.$walletService.new(this.password, this.network, userhomedir);
      if(created && created.success){
        console.log('created', created);
        if(await this.configService.updateAppConfig('account_dirs', {
            account: this.account,
            userhomedir: this.configService.userhomedir,
            network: this.network,
            isdefault: true
          }) ){
          if(await this.configService.startCheck(this.account)){
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

    },
    finish(){
      this.clearup()
      this.emitter.emit('walletCreateFinished')
    },
    resetErrors(){
      this.error = false;
    },
    clearup(){
      this.password = ""
      this.password2 = ""
      this.walletCreating = false
      this.error = false,
      this.errorInfo = ''
    },
    toLogin(){
      this.clearup()
      this.emitter.emit('restoredThenSettings')
    }

  }
}
</script>

<style>

</style>
