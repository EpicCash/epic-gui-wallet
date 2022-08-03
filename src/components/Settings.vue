<template>


  <section class="section is-main-section" >
    <div class="columns">
      <div class="column is-half">


          <NodeserverField ref="nodeserverField" class="is-fullwidth" />

          <div class="field">
            <label class="label">{{ $t("msg.lang.lang") }}</label>
            <div class="control">
              <div class="select is-fullwidth">
                <select v-model="localeSelected">
                  <option v-for="(lang, value) in langs" :value="value" :key="lang.id" >{{lang}}</option>
                </select>
              </div>
            </div>
          </div>

          <div class="field">
            <label class="label">{{ $t("msg.settings.wallet_listener") }}</label>
            <div class="control">
                <input class="switch is-success" id="walletListenSwitch" type="checkbox" v-model="walletlisten_on_startup">
                <label for="walletListenSwitch">{{ $t("msg.settings.auto_start") }}</label>
            </div>
          </div>

          <div class="field">
            <label class="label">{{ $t("msg.settings.authtoken") }}<a class="icon-text" style="font-size:0.8rem;" @click="toggleAdvancedSettings" >
              <mdicon size="18" v-if="!advancedSettings" name="menu-right" />
              <mdicon size="18" v-else name="menu-down" />
              {{ $t("msg.settings.howto") }}
            </a></label>

            <div class="card" v-bind:class="{'is-hidden':!advancedSettings}" >
              <div class="card-content">
                <div class="content">
                  <div class="field">
                     <p>{{ $t("msg.settings.ngrok_account_hint") }}</p>
                     <div class="control">
                       <videoPlay width="100%" height="auto" v-bind="playerOptions" @play="onPlay" ></videoPlay>
                     </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="control">
              <input
                class="input"
                type="ngrok"
                required
                v-model="ngrok" />
                <p class="help">
                  {{ $t("msg.settings.authtoken_hint") }}
                </p>
            </div>

          </div>

          <div class="field">
            <div class="control">
                <input class="switch is-success" id="ngrokSwitch" type="checkbox" v-model="ngrok_force_start">
                <label for="ngrokSwitch">{{ $t("msg.settings.ngrok_force_start") }}</label>
                <p class="help">
                  {{ $t("msg.settings.ngrok_hint") }}
                </p>
            </div>
          </div>



          <div class="field">
            <div class="control">
              <p>&nbsp;</p>
              <button class="button is-primary" @click="save" >{{ $t("msg.save") }}</button>
            </div>
          </div>


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
    watch: {
        'ngrok': function (newVal) {

          if(newVal !== ''){
            this.ngrok_force_start = false
          }
        },
        'ngrok_force_start': function (newVal) {

          if(newVal){
            this.ngrok = '';
          }
        },
    },
    setup(){

      const { resetFormErrors } = useFormValidation();
      const nodeserverField = ref('');
      const store = useStore();
      const localeSelected = ref('en');
      const langs = ref([]);
      const check_node_api_http_addr = ref('');
      const walletlisten_on_startup = ref(false);
      const ngrok_force_start = ref(false);
      const ngrok = ref('');
      const advancedSettings = ref(false);
      const playerOptions = reactive({
          // videojs options
          autoPlay: true,
          loop: true,
          src: "https://github.com/EpicCash/epic-gui-wallet/blob/4.0.0-alpha/src/assets/ngrok_authtoken_1024.mov?raw=true",
          control: false,

      });

      //dont remove or videoplay throws errors
      const onPlay = (ev) => {};

      return{
        store,
        nodeserverField,
        resetFormErrors,
        localeSelected,
        langs,
        check_node_api_http_addr,
        walletlisten_on_startup,
        ngrok,
        ngrok_force_start,
        playerOptions,
        advancedSettings,
        onPlay
      }
    },

    mounted(){

      this.nodeserverField.select = !this.store.state.user.nodeInternal ? 'external' : 'internal';

      this.localeSelected = this.configService.config['locale'];
      this.langs = this.configService.langs;
      this.walletlisten_on_startup = this.configService.config['walletlisten_on_startup'];
      this.nodeserverField.input = this.configService.config['check_node_api_http_addr'];
      this.ngrok = this.store.state.user.ngrok;
      this.ngrok_force_start = this.store.state.user.ngrok_force_start;
    },

    methods: {
      toggleAdvancedSettings(){

        this.advancedSettings = !this.advancedSettings;
      },
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
            updated = await this.$userService.updateUserByAccount(this.configService.configAccount, {nodeInternal:false, ngrok: this.ngrok, ngrok_force_start: this.ngrok_force_start});
          }else{
            updated = await this.$userService.updateUserByAccount(this.configService.configAccount, {nodeInternal:true, ngrok: this.ngrok, ngrok_force_start: this.ngrok_force_start});
          }

          /*todo simple node restart user update wallet restart here*/
          if(updated){
            this.store.commit('nodeType', this.nodeserverField.select);
            this.$toast.success(this.$t("msg.settings.settings_saved"));
            this.emitter.emit('app.nodeStart');
            if(this.ngrok != '' || this.ngrok_force_start){
              this.emitter.emit('app.ngrokStart');
            }else{
              this.emitter.emit('app.ngrokStop');
            }
          }else{
            this.$toast.error(this.$t("msg.settings.error_save"));
          }



        }else{
          return;
        }

      },

    }
  }
</script>
