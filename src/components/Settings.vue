<template>

<div class="modal" :class="{'is-active': showModal}">
  <div class="modal-background" @click="closeModal"></div>
  <div class="modal-card" >
    <header class="modal-card-head">
      <p class="modal-card-title is-size-4 has-text-link has-text-weight-semibold">{{ $t("msg.settings.title") }}</p>
      <button class="delete" aria-label="close" @click="closeModal"></button>
    </header>
    <section class="modal-card-body">


        <div class="notification is-warning" v-if="errors.length">
          <p v-for="error in errors" :key="error">{{ error }}</p>
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
          <label class="label">{{ $t("msg.settings.check_node_api_http_addr") }}</label>
          <div class="control">
            <input class="input" type="text" v-model="check_node_api_http_addr" placeholder="http://127.0.0.1:3413">
            <p class="hint">{{ $t("msg.settings.node_api_addr_hint") }}</p>

          </div>
        </div>

        <div class="field">
          <label class="label">{{ $t("msg.lang.lang") }}</label>

          <div class="control">
            <div class="select">
              <select v-model="localeSelected">
                <option v-for="(lang, locale) in langs" :value="locale" :key="lang">{{lang}}</option>
              </select>
            </div>
          </div>
        </div>


        <p>&nbsp;</p>
        <div class="field is-grouped">
          <div class="control">
            <button class="button is-link" @click="save" v-bind:class="{'is-loading': isLoading }">{{ $t("msg.save") }}</button>
          </div>
          <div class="control">
            <button class="button is-text" @click="closeModal">{{ $t("msg.cancel") }}</button>
          </div>
        </div>
    </section>
  </div>
</div>

</template>
<script>

  export default {
    name: "settings",
    props: {
      showModal: {
        type: Boolean,
        default: false
      },
      config:{
        type: Object,
      }
    },
    data() {

      return {

        errors: [],
        check_node_api_http_addr: '',
        network: '',
        locale: 'en',
        localeSelected: this.configService.config.locale,
        langs: this.configService.langs,
        isLoading: false,

      }
    },
    mounted(){
      if(this.config){
        this.check_node_api_http_addr = this.config['check_node_api_http_addr'];
        this.network = this.config['network'];
        this.locale = this.config['local'];
      }
    },
    methods: {

      async save(){


        if(this.checkForm()){
          this.isLoading = true;
          this.emitter.emit('selectLocale', this.localeSelected);

          if(this.configService.config.firstTime == true){


            //change app user settings and update wallet toml
            this.configService.updateConfig({
              check_node_api_http_addr: this.check_node_api_http_addr,
              network: this.network,
              locale: this.localeSelected,
              firstTime: false

            });
            this.configService.checkTomlFile();

            this.emitter.emit('continueLoginFirst');
            return;

          }else{

              //change app user settings and update wallet toml
              this.configService.updateConfig({
                check_node_api_http_addr: this.check_node_api_http_addr,
                network: this.network,
                locale: this.localeSelected
              });
              this.configService.checkTomlFile();

              this.emitter.emit('restartNode');
              this.emitter.emit('close', 'windowSettings');
          }

        }
      },
      clearup(){
        this.errors = []
      },
      closeModal() {
        this.clearup();
        this.emitter.emit('close', 'windowSettings');

      },

      validAddress(address) {
        let re = new RegExp('^(https?:\\/\\/)'+ // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
          '(\\#[-a-z\\d_]*)?$','i');
        return re.test(address);
      },
      checkForm(){
        this.errors = []
        if (!this.check_node_api_http_addr || !this.validAddress(this.check_node_api_http_addr)) {
          this.errors.push(this.$t('msg.wrongAddressFormat'));
        }

        if (!this.errors.length) {
          return true;
        }
      },

    }
  }
</script>
