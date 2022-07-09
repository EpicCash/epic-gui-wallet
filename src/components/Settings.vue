<template>


    <section class="section is-main-section" >

        <NodeserverField ref="nodeserverField" />

        <div class="field">
          <label class="label">{{ $t("msg.lang.lang") }}</label>
          <div class="control">
            <div class="select">
              <select v-model="localeSelected">
                <option v-for="(lang, value) in langs" :value="value" :key="lang.id" >{{lang}}</option>
              </select>
            </div>
          </div>
        </div>

        <div class="field">
          <div class="control">
            <label class="checkbox">
              <input class="switch is-success" id="walletListenSwitch" type="checkbox" v-model="walletlisten_on_startup">
              <label for="walletListenSwitch">automatically start wallet listener after login</label>
            </label>
          </div>
        </div>

        <div class="field">
          <label class="label">Your Ngrok Authtoken</label>

          <div class="control">
            <input
              class="input"
              type="ngrok"
              required
              v-model="ngrok" />
          </div>

          <videoPlay v-bind="playerOptions"></videoPlay>

        </div>

        <div class="field">
          <div class="control">
            <button class="button is-primary" @click="save" >{{ $t("msg.save") }}</button>
          </div>

        </div>
    </section>


</template>
<script>

import { ref, reactive } from 'vue';
import { useStore } from '@/store';
import NodeserverField from "@/components/form/nodeserverField";
import useFormValidation from "@/modules/useFormValidation";
import "vue3-video-play/dist/style.css";
import { videoPlay } from "vue3-video-play";

  export default {
    name: "settings",
    components: {
      NodeserverField,
      videoPlay,
    },
    setup(){

      const { resetFormErrors } = useFormValidation();
      const nodeserverField = ref('');
      const store = useStore();
      const localeSelected = ref('en');
      const langs = ref([]);
      const check_node_api_http_addr = ref('');
      const walletlisten_on_startup = ref(false);
      const ngrok = ref('');
      const playerOptions = reactive({
          // videojs options

          src: "../assets/ngrok_authtoken_1024.mov"

      });
      return{
        store,
        nodeserverField,
        resetFormErrors,
        localeSelected,
        langs,
        check_node_api_http_addr,
        walletlisten_on_startup,
        ngrok,
        playerOptions
      }
    },

    mounted(){

      this.nodeserverField.select = !this.store.state.user.nodeInternal ? 'external' : 'internal';

      this.localeSelected = this.configService.config['locale'];
      this.langs = this.configService.langs;
      this.walletlisten_on_startup = this.configService.config['walletlisten_on_startup'];
      this.nodeserverField.input = this.configService.config['check_node_api_http_addr'];
      this.ngrok = this.store.state.user.ngrok;

    },

    methods: {

      async save(){

        this.resetFormErrors();
        let isFormAllValid = [];

        isFormAllValid.push(this.nodeserverField.validInput());

        if(!isFormAllValid.includes(false)){

          this.configService.updateConfig({

            check_node_api_http_addr: this.nodeserverField.defaultValue,
            locale: this.localeSelected,
            walletlisten_on_startup: this.walletlisten_on_startup

          });
          this.configService.checkTomlFile();

          let updated = 0;
          if(this.nodeserverField.select == 'external'){
            updated = await this.$userService.updateUserByAccount(this.configService.configAccount, {nodeInternal:false, ngrok: this.ngrok});
          }else{
            updated = await this.$userService.updateUserByAccount(this.configService.configAccount, {nodeInternal:true, ngrok: this.ngrok});
          }

          /*todo simple node restart user update wallet restart here*/
          if(updated){
            this.store.commit('nodeType', this.nodeserverField.select);
            this.$toast.success('Settings saved');
            this.emitter.emit('app.nodeStart');
          }else{
            this.$toast.error('Error saving settings');
          }



        }else{
          return;
        }

      },

    }
  }
</script>
