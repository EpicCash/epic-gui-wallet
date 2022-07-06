<template>


    <section class="section is-main-section" >

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
          <div class="control has-icons-right">
            <input class="input" type="text" v-model="check_node_api_http_addr" placeholder="http://127.0.0.1:3413">
            <span class="icon is-small is-right" v-if="isLoading"><font-awesome-icon :icon="['fas', 'spinner']"/></span>
            <p class="hint">{{ $t("msg.settings.node_api_addr_hint") }}</p>
            <div class="box" v-if="errorapi">
              <p style="color:red;" class="help is-warningapi" >{{ this.errorapiMsg }}</p>
            </div>
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
            <button class="button is-link" @click="save" >{{ $t("msg.save") }}&nbsp;<span v-if="isLoading"><font-awesome-icon :icon="['fas', 'spinner']"/></span></button>
          </div>

        </div>
    </section>


</template>
<script>

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
library.add(faSpinner)

  export default {
    name: "settings",
    components: {
      FontAwesomeIcon
    },
    props: {

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
        errorapiMsg: '',
        errorapi: false,
        errorCode: ''

      }
    },
    mounted(){
      if(this.config){
        this.check_node_api_http_addr = this.config['check_node_api_http_addr'];
        this.network = this.config['network'];
        this.locale = this.config['local'];
      }
    },
    created(){

      this.emitter.on('settings_error', ({msg, code})=>{
          if(msg != '' && code != ''){
            this.errorapi = true;
            this.errorapiMsg = msg;
            this.errorCode = code;
          }else{
            this.errorapi = false;
            this.errorapiMsg = '';
            this.errorCode = '';
          }
      });
    },

    methods: {

      async save(){

        this.isLoading = true;



        if(await this.checkForm()){

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
            this.isLoading = false;
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
              this.isLoading = false;
          }

        }else{
          this.isLoading = false;
        }
      },
      clearup(){
        this.errors = []
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
      async checkForm(){

        this.errors = []
        if (!this.check_node_api_http_addr || !this.validAddress(this.check_node_api_http_addr)) {
          this.errors.push(this.$t('msg.wrongAddressFormat'));
        }

        this.check_node_api_http_addr = this.check_node_api_http_addr.trim();
        this.check_node_api_http_addr = this.check_node_api_http_addr.replace(/\/$/, "");


        let nodeOnline = await this.$nodeService.nodeOnline(this.check_node_api_http_addr);
        if(!nodeOnline){
          return false;
        }
        if (!this.errors.length) {
          return true;
        }
      },

    }
  }
</script>
