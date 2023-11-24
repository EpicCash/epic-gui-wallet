<template>


  <section class="section is-main-section" >
    <div class="columns">
      <div class="column is-half">


          <NodeserverField ref="nodeserverField" class="is-fullwidth" />
          <div class="field">

            <div class="control">
                <input :disabled="!nodeInternal" @change="changeNodeBackgroundSetting" class="switch is-success" id="walletListenSwitch" type="checkbox" v-model="node_background">
                <label for="walletListenSwitch">{{ $t("msg.settings.node_background") }}</label>
                <p class="help">{{ $t("msg.settings.node_background_hint") }}</p>
            </div>
          </div>
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
          <div class="field"></div>
          <div class="field">
            <label class="label">{{ $t("msg.settings.epicbox_domain") }}</label>
            <div class="control">

                <input
                  class="input"
                  type="epicbox"
                  required
                  v-model="epicboxDomain" />
              <p class="help">{{ $t("msg.settings.epicbox_domain_hint") }}</p>
            </div>
          </div>

          <div class="field">
            <label class="label">{{ $t("msg.settings.wallet_listener") }}</label>
            <div class="control">
                <input class="switch is-success" id="nodeBackgroundSync" type="checkbox" v-model="walletlisten_on_startup">
                <label for="nodeBackgroundSync">{{ $t("msg.settings.auto_start") }}</label>
            </div>
          </div>
          <div class="field">

            <div class="control">
                <input :disabled="(nodeInternal && !node_background)" class="switch is-success" id="walletListenEpicbox" type="checkbox" v-model="epicbox_background">
                <label for="walletListenEpicbox">{{ $t("msg.settings.epicbox_background") }}</label>
                <p class="help">{{ $t("msg.settings.epicbox_background_hint") }}</p>
            </div>
          </div>



          <div class="field">
            <div class="control">
              <input class="switch is-success" id="advancedSettings" type="checkbox" @click="toggleAdvancedSettings" v-model="advancedSettings" >
              <label for="advancedSettings">{{ $t("msg.advanced_settings") }}</label>


              </div>
          </div>

          <div class="card" v-bind:class="{'is-hidden':!advancedSettings}" >

            <div class="card-content">
               <div class="content">

                  <div class="field">
                    <label class="label">{{ $t("msg.settings.authtoken") }}<a class="icon-text" style="font-size:0.8rem;" @click="toggleAdvancedNgrokSettings" >
                      <mdicon size="18" v-if="!advancedNgrokSettings" name="menu-right" />
                      <mdicon size="18" v-else name="menu-down" />
                      {{ $t("msg.settings.howto") }}
                    </a></label>

                    <div class="card" v-bind:class="{'is-hidden':!advancedNgrokSettings}" >
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

                </div>
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

import { ref, reactive, onUnmounted } from 'vue';
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
      const epicboxDomain = ref('');
      const langs = ref([]);
      const check_node_api_http_addr = ref('');
      const walletlisten_on_startup = ref(false);
      const node_background = ref(false);
      const epicbox_background = ref(false);
      const ngrok_force_start = ref(false);
      const ngrok = ref('');
      const advancedSettings = ref(false);
      const advancedNgrokSettings = ref(false);
      const nodeInternal = ref(false);
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
        epicboxDomain,
        langs,
        check_node_api_http_addr,
        walletlisten_on_startup,
        node_background,
        epicbox_background,
        ngrok,
        ngrok_force_start,
        playerOptions,
        advancedSettings,
        advancedNgrokSettings,
        onPlay,
        nodeInternal
      }
    },
    async created() {

      this.emitter.on('settings.nodeserverFieldChanged', () => {
        this.changeNodeBackgroundSetting();
      });
    },
    beforeUnmount(){
      this.emitter.off('settings.nodeserverFieldChanged');
    },
    mounted(){
      this.nodeInternal = this.store.state.user.nodeInternal;
      this.nodeserverField.select = !this.store.state.user.nodeInternal ? 'external' : 'internal';

      this.localeSelected = this.configService.config['locale'];
      this.epicboxDomain = this.configService.config['epicbox_domain'];
      this.langs = this.configService.langs;
      this.walletlisten_on_startup = this.configService.config['walletlisten_on_startup'];
      this.node_background = this.configService.config['node_background'];


      this.epicbox_background = (this.node_background && this.nodeInternal) ? this.configService.config['epicbox_background'] : false;

      this.nodeserverField.input = this.configService.config['check_node_api_http_addr'];
      this.ngrok = this.store.state.user.ngrok;
      this.ngrok_force_start = this.store.state.user.ngrok_force_start;
      this.advancedSettings = this.store.state.user.advanced_settings;
    },

    methods: {
      toggleAdvancedSettings(){

        this.advancedSettings = !this.advancedSettings;
      },
      toggleAdvancedNgrokSettings(){

        this.advancedNgrokSettings = !this.advancedNgrokSettings;
      },

      changeNodeBackgroundSetting(){
        console.log('changeNodeBackgroundSetting', this.nodeserverField.select);
        if(this.nodeserverField.select == 'external'){
          this.nodeInternal = false;
          this.node_background = false;
        }else{
          this.nodeInternal = true;
        }

        if(!this.node_background && this.nodeserverField.select == 'internal')
          this.epicbox_background = false;

      },



      async save(){

        this.resetFormErrors();
        let isFormAllValid = [];

        isFormAllValid.push(this.nodeserverField.validInput());

        if(!isFormAllValid.includes(false)){


          this.configService.updateConfig({

            check_node_api_http_addr: this.nodeserverField.defaultValue.trim(),
            locale: this.localeSelected,
            walletlisten_on_startup: this.walletlisten_on_startup,
            node_background: this.node_background,
            epicbox_background: this.epicbox_background,
            epicbox_domain: this.epicboxDomain.trim(),

          });
          this.configService.checkTomlFile();

          let updated = 0;
          if(this.nodeserverField.select == 'external'){
            updated = await this.$userService.updateUserByAccount(this.configService.configAccount, {nodeInternal:false, ngrok: this.ngrok, ngrok_force_start: this.ngrok_force_start, advanced_settings: this.advancedSettings, epicbox_domain: this.epicboxDomain.trim()});
          }else{
            updated = await this.$userService.updateUserByAccount(this.configService.configAccount, {nodeInternal:true, ngrok: this.ngrok, ngrok_force_start: this.ngrok_force_start, advanced_settings: this.advancedSettings, epicbox_domain: this.epicboxDomain.trim()});
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

            this.emitter.emit('app.selectLocale', this.localeSelected);

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
