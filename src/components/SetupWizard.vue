<template>


  <section class="section hero is-fullheight">
      <section class="hero">
        <div class="hero-body">
          <div class="container">
            <div class="columns is-centered">
              <div class="column is-three-quarters">
                <div class="card has-card-header-background">

                  <header class="card-header" style="justify-content: center;">
                    <img src="../assets/img/epiccash-brand-full.png" style="width: 190px; padding: 16px 0px;">
                  </header>
                  <div class="card-content">
                    <h2 class="title" style="color: #d19944; text-transform: uppercase; text-align: center;">{{ $t("msg.setupwizard.setup_assistant") }}</h2>

                    <div id="stepContainerWrap">

                      <div id="stepContainer">
                        <div class="stepContainerLine"></div>

                        <div class="stepContainerLineFill" v-bind:class="{'lineFillStep2': step==='step2' || step==='step3'   }"></div>
                        <div class="stepContainerLineFill" v-bind:class="{'lineFillStep2Back': step==='step1' && moveback }"></div>

                        <div class="stepContainerLineFill" v-bind:class="{'lineFillStep3': step==='step3' || step==='step4'  }"></div>
                        <div class="stepContainerLineFill" v-bind:class="{'lineFillStep3Back': step==='step2' && moveback  }"></div>



                        <div class="circle" >
                          <svg class="circleFill" v-bind:class="{'filled': step==='step2' || step==='step3' || step==='step4' }" viewBox="0 0 30 10" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="15" cy="5" r="13" stroke="#d19944" stroke-width="2.2" fill="none"></circle>
                          </svg>
                          <svg class="circleTrack" viewBox="0 0 30 10" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="15" cy="5" r="13" stroke="#ffffff" stroke-width="2" fill="none"></circle>
                          </svg>
                          <h3>1</h3>
                        </div>

                        <div class="circle">
                          <svg class="circleFill" v-bind:class="{'filled': step==='step3' || step==='step4'  }" viewBox="0 0 30 10" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="15" cy="5" r="13" stroke="#d19944" stroke-width="2.2" fill="none"></circle>
                          </svg>
                          <svg class="circleTrack" viewBox="0 0 30 10" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="15" cy="5" r="13" stroke="#ffffff" stroke-width="2" fill="none"></circle>
                          </svg>
                          <h3>2</h3>
                        </div>

                        <div class="circle">
                          <svg class="circleFill" v-bind:class="{'filled': step==='step4' }" viewBox="0 0 30 10" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="15" cy="5" r="13" stroke="#d19944" stroke-width="2.2" fill="none"></circle>
                          </svg>
                          <svg class="circleTrack" viewBox="0 0 30 10" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="15" cy="5" r="13" stroke="#ffffff" stroke-width="2" fill="none"></circle>
                          </svg>
                          <h3>3</h3>
                        </div>


                      </div>
                    </div><!-- end stepContainerWrap -->

                    <div v-show="step==='step1'" >
                      <h2 class="title is-4" style="color: #d19944!important;margin-bottom: 24px;">{{ $t("msg.setupwizard.account_information") }}</h2>

                        <div class="field">
                          <label class="label">{{ $t("msg.setupwizard.your_name") }}<span class="required">*</span></label>
                          <TextField ref="textField" fieldname="name" />
                          <p class="help">{{ $t("msg.setupwizard.name_only_internal") }}</p>
                        </div>

                        <div class="field">
                          <label class="label">{{ $t("msg.setupwizard.keybase") }}</label>
                          <div class="control">
                            <input class="input" type="keybase" required v-model="keybase" />
                            <p class="help">
                               {{ $t("msg.setupwizard.enter_keybase") }}
                             </p>
                          </div>
                        </div>

                        <div class="field">
                          <label class="label">{{ $t("msg.lang.lang") }}</label>
                          <div class="control">
                            <div class="select is-fullwidth">
                              <select v-model="localeSelected">
                                <option v-for="(lang, locale) in langs" :value="locale" :key="lang.id">{{lang}}</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <p>&nbsp;</p>
                        <p>&nbsp;</p>
                        <div class="buttons is-centered">

                          <button v-if="fromRoute == 'navbar'" class="button is-primary" @click="backToDashbaord()"><mdicon name="arrow-left-bold-hexagon-outline" />{{ $t("msg.back") }}</button>
                          <button class="button is-primary" @click="nextStep('step2')" >{{ $t("msg.setupwizard.next_step") }}&nbsp;<mdicon size=22 name="arrow-right-circle-outline" /></button>

                        </div>

                    </div><!-- end step 1 -->


                    <div v-show="step==='step2'">

                      <h2 class="title is-4" style="color: #d19944!important;margin-bottom: 24px;">
                        {{ $t("msg.setupwizard.network_node") }}
                      </h2>
                      <article class="message is-info">
                        <div class="message-body">
                          <span v-html="$t('msg.setupwizard.network_node_txt')" ></span>

                        </div>
                      </article>
                      <NodeserverField ref="nodeserverField" />
                      <p>&nbsp;</p>
                      <p>&nbsp;</p>
                      <div class="buttons is-centered">
                          <button class="button is-primary" @click="prevStep('step1')" ><mdicon name="arrow-left-circle-outline" />&nbsp;{{ $t("msg.setupwizard.previous_step") }}</button>
                          <button class="button is-primary" @click="nextStep('step3')" >{{ $t("msg.setupwizard.next_step") }}&nbsp;<mdicon name="arrow-right-circle-outline" /></button>
                      </div>

                    </div><!-- end step 2 -->


                    <div v-show="step==='step3'">

                      <h2 class="title is-4" style="color: #d19944!important;margin-bottom: 24px;">{{ $t("msg.setupwizard.receive_transactions") }}</h2>
                      <article class="message is-info">
                        <div class="message-body">
                          <span v-html="$t('msg.setupwizard.receive_transactions_txt')" ></span>
                        </div>
                      </article>
                      <div class="field">
                        <label class="label">{{ $t("msg.setupwizard.authtoken") }}
                          <a class="icon-text" style="font-size:0.8rem;" @click="toggleAdvancedSettings" >
                            <mdicon size="18" v-if="!advancedSettings" name="menu-right" />
                            <mdicon size="18" v-else name="menu-down" />
                            {{ $t("msg.setupwizard.howto") }}
                          </a>

                        </label>
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
                            <input class="input" type="ngrok" required v-model="ngrok" />
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



                      <p>&nbsp;</p>
                      <p>&nbsp;</p>
                      <div class="buttons is-centered">
                        <button class="button is-primary" @click="prevStep('step2')" ><mdicon name="arrow-left-circle-outline" />&nbsp;{{ $t("msg.setupwizard.previous_step") }}</button>
                        <button class="button is-primary" @click="nextStep('step4')" >&nbsp;{{ $t("msg.setupwizard.next_step") }}<mdicon name="arrow-right-circle-outline" /></button>
                      </div>

                    </div><!-- end step 3 -->

                    <div v-show="step==='step4'">

                      <h2 class="title is-4" style="color: #d19944!important;margin-bottom: 24px;">{{ $t("msg.setupwizard.values_correct") }}</h2>
                      <p>
                        {{ $t("msg.setupwizard.name") }}: {{this.textField.defaultValue}}<br/>
                        {{ $t("msg.setupwizard.keybase_account") }}: {{keybase}}<span v-if="!keybase">-</span><br/>
                        {{ $t("msg.setupwizard.language") }}: {{localeSelected}}<br/>
                        {{ $t("msg.setupwizard.ngrok_authtoken") }}: {{ngrok}}<span v-if="!ngrok">-</span><br/>
                        {{ $t("msg.setupwizard.network_node") }}: {{nodeserverField.nodeInternal ? 'built-in' : this.nodeserverField.defaultValue}}<br/>
                      </p>
                      <p>&nbsp;</p>
                      <p>&nbsp;</p>
                      <div class="buttons is-centered">
                        <button class="button is-primary" @click="prevStep('step3')" ><mdicon name="arrow-left-circle-outline" />&nbsp;{{ $t("msg.setupwizard.previous_step") }}</button>
                        <button class="button is-primary" @click="save" >{{ $t("msg.setupwizard.save_and_finish") }}</button>
                      </div>


                    </div><!-- end step 3 -->


                  </div><!-- card content -->
                </div>
              </div>
            </div>
          </div><!-- end container -->
        </div><!-- end hero-body -->
      </section>
    </section>
</template>
<script>

  import { ref, reactive, onUnmounted } from 'vue';
  import NodeserverField from "@/components/form/nodeserverField";
  import TextField from "@/components/form/textField";
  import useFormValidation from "@/modules/useFormValidation";
  import { useRouter } from '@/router';
  import { useRoute } from 'vue-router';
  import { useStore } from '@/store';
  import "vue3-video-play/dist/style.css";
  import { videoPlay } from "vue3-video-play";

  export default {
    name: "setup-wizard",
    components: {
      NodeserverField,
      TextField,
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
      const store = useStore();
      const router = useRouter();
      const route = useRoute();
      const check_node_api_http_addr = ref('');
      const network = ref('');
      const ngrok = ref('');
      const ngrok_force_start = ref(false);

      const locale = ref('en');
      const localeSelected = ref('en');
      const langs = ref([]);
      const errorapi = ref(false);
      const step = ref('step1');
      const moveback = ref(false);
      const name = ref('');
      const keybase = ref('');

      const { resetFormErrors } = useFormValidation();
      const nodeserverField = ref('');
      const textField = ref('');
      const advancedSettings = ref(false);
      const fromRoute = route.params.from ? route.params.from : 'login';

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
        router,
        check_node_api_http_addr,
        network,
        locale,
        localeSelected,
        langs,
        errorapi,
        step,
        nodeserverField,
        resetFormErrors,
        name,
        keybase,
        ngrok,
        ngrok_force_start,
        advancedSettings,
        playerOptions,
        textField,
        moveback,
        onPlay,
        fromRoute

      }
    },

    mounted(){
      this.store.dispatch('toggleFullPage', true);
      this.store.commit('asideStateToggle', false);
      this.locale = this.configService.config['locale'];
      this.localeSelected = this.configService.config['locale'];
      this.langs = this.configService.langs;
    },
    methods: {
      toggleAdvancedSettings(){

        this.advancedSettings = !this.advancedSettings;
      },
      validateStep(step){
        this.resetFormErrors();
        let isFormAllValid = [];
        let isValid = true;
        switch(step){


          case 'step2':

            isFormAllValid.push(this.textField.validInput('name'));
            isValid = !isFormAllValid.includes(false);


          break;
          case 'step3':
            isFormAllValid.push(this.nodeserverField.validInput());
            isValid = !isFormAllValid.includes(false);
          break;

        }
        return isValid;

      },
      nextStep(step){

        if(this.validateStep(step)){
          this.moveback = false;
          this.step = step;
        }
      },
      prevStep(step){
        this.moveback = true;
        this.step = step;

      },
      backToDashbaord(){
        this.emitter.emit('app.accountLoggedIn');
      },
      async save(){
        try{

          let user = await this.$userService.getUser(this.configService.configAccount);


          if(user.length){
            await this.$userService.updateUserByAccount(this.configService.configAccount, {
              account: this.configService.configAccount,
              name: this.textField.defaultValue,
              keybase: this.keybase,
              ngrok: this.ngrok,
              ngrok_force_start: this.ngrok_force_start,
              language: this.localeSelected,
              nodeInternal: this.nodeserverField.nodeInternal,
              email: ''
            });

          }else{

            let inserted = await this.$userService.addUser({
              account: this.configService.configAccount,
              name: this.textField.defaultValue,
              keybase: this.keybase,
              ngrok: this.ngrok,
              ngrok_force_start: this.ngrok_force_start,
              language: this.localeSelected,
              nodeInternal: this.nodeserverField.nodeInternal,
              email: ''
            });
            if(inserted.length){
              user = inserted;
            }else{
              this.$toast.error(this.$t("msg.setupwizard.db_fatal"));
              return;
            }


          }


          this.configService.updateConfig({
            version: this.configService.configVersion,
            check_node_api_http_addr: this.nodeserverField.defaultValue,
            locale: this.localeSelected,
            firstTime: false,
            walletlisten_on_startup: true,
            nodesynced: false

          });

          this.configService.checkTomlFile();
          this.store.commit('user', user[0]);
          this.emitter.emit('app.accountLoggedIn');


        }catch(e){
          this.$toast.error(this.$t("msg.setupwizard.errors_save", [e.message]));
          return
        }

      },

    }
  }
</script>
