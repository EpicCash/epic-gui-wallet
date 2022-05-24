<template>
  <section class="hero" >
    <div class="hero-body">
      <div class="container">

        <div class="columns is-centered">

          <div class="column is-8" >

            <div class="columns is-centered">
                <img src="../assets/epiccash_logo.png" style="width:30%;height:auto;">
            </div>
            <h1 class="title has-text-centered">{{ $t('msg.welcome') }}</h1>
            <div class="buttons is-justify-content-center">
              <a class="button is-link is-outlined" @click="select">{{ $t("msg.new.select") }}</a>
              <a class="button is-link is-outlined" @click="create">{{ $t("msg.new.create") }}</a>
              <a class="button is-link is-outlined" @click="restore">{{ $t("msg.new.restore") }}</a>
            </div>
            <p class="help is-danger has-text-centered" v-if="error">{{ errMsg }}</p>
          </div>
        </div>

        <div v-if="selectNetwork" class="columns is-centered">


          <div class="column is-4" >
            <p class="help is-danger has-text-centered" ><span v-html="$t('msg.new.networkErr')"></span></p>
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
              <button class="button is-link" @click.prevent="selectedNetwork" >{{ $t('msg.new.selectNetwork') }}</button>
            </div>

          </div>
        </div>




      </div>
    </div>
  </section>
</template>


<script>


export default {
  name: "new",
  data() {
    let config = this.configService.config;
    let network = config['network'] ? config['network'] : 'mainnet';
    return {
      error: false,
      errMsg: '',
      selectNetwork: false,
      network: network,
      userHomedir: '',
    }
  },
  created () {

    this.emitter.on('selectNetwork', async()=>{
      this.selectNetwork = true;
    });

  },
  methods: {
    async selectedNetwork(){
      let haswallet = await this.configService.walletDirExist(this.userHomedir, this.network);
      if(!haswallet){
        this.error = 1;
        this.errMsg = this.$t("msg.new.selectErr");
      }else{
        this.emitter.emit('toLogin');
      }
    },
    create(){

      this.emitter.emit('initMode', 'create');
    },
    restore(){

      this.emitter.emit('initMode', 'restore');
    },
    async select(){

        this.error = false;
        this.selectNetwork = false;

        let customHomedir = await window.api.showOpenDialog();

        if(customHomedir.canceled == false){

          this.userHomedir = customHomedir.filePaths[0];
          if(this.userHomedir){


            let haswallet = await this.configService.walletDirExist(this.userHomedir);
            if(!haswallet){
              this.error = 1;
              this.errMsg = this.$t("msg.new.selectErr");
            }else{
              this.emitter.emit('toLogin');
            }

          }

        }

    }
  }


}
</script>
<style>

</style>
