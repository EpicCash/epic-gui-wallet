<template>

<div class="modal" :class="{'is-active': showModal}">
  <div class="modal-background" @click="closeModal"></div>
  <div class="modal-card" >
    <header class="modal-card-head">
      <p class="modal-card-title is-size-4 has-text-link has-text-weight-semibold">{{ $t("msg.settings.title") }}</p>
      <button class="delete" aria-label="close" @click="closeModal"></button>
    </header>
    <section class="modal-card-body" style="height:200px;background-color: whitesmoke;">
        <div class="notification is-warning" v-if="errors.length">
          <p v-for="error in errors" :key="error">{{ error }}</p>
        </div>

        <div class="field">
          <label class="label">{{ $t("msg.settings.check_node_api_http_addr") }}</label>
          <div class="control">
            <input class="input" type="text" v-model="check_node_api_http_addr" placeholder="http://127.0.0.1:3413">
            <p class="hint">{{ $t("msg.settings.node_api_addr_hint") }}</p>

          </div>
        </div>


        <p>&nbsp;</p>
        <div class="field is-grouped">
          <div class="control">
            <button class="button is-link" @click="save">{{ $t("msg.save") }}</button>
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
  import { updateConfig, getConfig } from '../shared/config.js'
  let config = getConfig();
  let nodeaddr = config['check_node_api_http_addr'] ? config['check_node_api_http_addr'] : 'http://127.0.0.1:3413';

  export default {
    name: "settings",
    props: {
      showModal: {
        type: Boolean,
        default: false
      }
    },
    data() {

      let address = nodeaddr
      return {
        errors: [],
        check_node_api_http_addr: address,
      }
    },
    methods: {
      async save(){
        if(this.checkForm()){


          if(this.nodeaddr !== this.check_node_api_http_addr){
            updateConfig({check_node_api_http_addr: this.check_node_api_http_addr});
            await this.$walletService.updateConfig();
            let killed = await this.$walletService.stopProcess('ownerAPI');
            console.log('wallet killed after change address', killed);
            if(killed){
              let started = await this.$walletService.start();
              console.log('wallet started after change address', started);
            }

          }


          this.emitter.emit('close', 'windowSettings');

        }
      },
      clearup(){
        this.errors = []
        this.check_node_api_http_addr = nodeaddr;

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
<style>
</style>
