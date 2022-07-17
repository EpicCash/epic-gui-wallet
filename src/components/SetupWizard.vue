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
                    <h2 class="title" style="color: #d19944; text-transform: uppercase; text-align: center;">Setup Assistant</h2>

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
                      <h2 class="title is-4" style="color: #d19944!important;margin-bottom: 24px;">Account information</h2>

                        <div class="field">
                          <label class="label">Your name<span class="required">*</span></label>
                          <TextField ref="textField" fieldname="name" />
                          <p class="help">Name is only internal used</p>
                        </div>

                        <div class="field">
                          <label class="label">Keybase</label>
                          <div class="control">
                            <input class="input" type="keybase" required v-model="keybase" />
                            <p class="help">
                               If you have a Keybase Account, you can enter here.</p>
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
                          <button class="button is-primary" @click="nextStep('step2')" >Next step&nbsp;<mdicon size=22 name="arrow-right-circle-outline" /></button>
                        </div>

                    </div><!-- end step 1 -->


                    <div v-show="step==='step2'">

                      <h2 class="title is-4" style="color: #d19944!important;margin-bottom: 24px;">
                        Network node
                      </h2>
                      <article class="message is-info">
                        <div class="message-body">
                          Your wallet requires a network node to send and receive transactions.<br/>
                          You can choose between the built-in node server and an external node server.<br/>
                          <br/>
                          If you are not sure which one to use, then leave the settings as they are.<br/>
                        </div>
                      </article>
                      <NodeserverField ref="nodeserverField" />
                      <p>&nbsp;</p>
                      <p>&nbsp;</p>
                      <div class="buttons is-centered">
                          <button class="button is-primary" @click="prevStep('step1')" ><mdicon name="arrow-left-circle-outline" />&nbsp;Previous step</button>
                          <button class="button is-primary" @click="nextStep('step3')" >Next step&nbsp;<mdicon name="arrow-right-circle-outline" /></button>
                      </div>

                    </div><!-- end step 2 -->


                    <div v-show="step==='step3'">

                      <h2 class="title is-4" style="color: #d19944!important;margin-bottom: 24px;">Receiving transactions</h2>
                      <article class="message is-info">
                        <div class="message-body">

                          To receive transactions from other wallets, your wallet must be accessible over the Internet.<br/>
                          <br/>
                          To simplify this process, we have integrated the ngrok tool into the wallet.<br/>
                          Once ngrok has been activated, your wallet will be accessible via a temporary ngrok address.<br/>
                          If you are not familiar with router settings and port forwarding, we recommend using the ngrok service.<br/>
                          <br/>
                          To receive your ngrok authentication token, please create a new account at ngrok.com.<br/>
                          <br/>
                          <br/>
                          Leave the field below blank, if you don’t want to use the ngrok service.<br/>

                        </div>
                      </article>
                      <div class="field">
                        <label class="label">Your ngrok Authtoken</label>

                          <div class="control">
                            <input class="input" type="ngrok" required v-model="ngrok" />
                          </div>
                      </div>
                      <div class="control">
                          <a class="icon-text" style="font-size:0.8rem;" @click="toggleAdvancedSettings" >
                            <mdicon size="18" v-if="!advancedSettings" name="menu-right" />
                            <mdicon size="18" v-else name="menu-down" />
                            How to get your Authtoken from ngrok
                          </a>
                      </div>
                      <div class="card" v-bind:class="{'is-hidden':!advancedSettings}" >
                        <div class="card-content">
                         <div class="content">
                           <div class="field">

                             <div class="control">
                               <videoPlay width="100%" height="auto" v-bind="playerOptions" @play="onPlay" ></videoPlay>
                             </div>
                           </div>
                        </div>
                      </div>
                    </div>
                      <p>&nbsp;</p>
                      <p>&nbsp;</p>
                      <div class="buttons is-centered">
                        <button class="button is-primary" @click="prevStep('step2')" ><mdicon name="arrow-left-circle-outline" />&nbsp;Previous step</button>
                        <button class="button is-primary" @click="nextStep('step4')" >&nbsp;Next step<mdicon name="arrow-right-circle-outline" /></button>
                      </div>

                    </div><!-- end step 3 -->

                    <div v-show="step==='step4'">

                      <h2 class="title is-4" style="color: #d19944!important;margin-bottom: 24px;">Are these values correct?</h2>
                      <p>
                        Name: {{this.textField.defaultValue}}<br/>
                        Keybase Account: {{keybase}}<span v-if="!keybase">-</span><br/>
                        Language: {{localeSelected}}<br/>
                        Ngrok Auth-Token: {{ngrok}}<span v-if="!ngrok">-</span><br/>
                        Network node: {{nodeserverField.nodeInternal ? 'built-in' : this.nodeserverField.defaultValue}}<br/>
                      </p>
                      <p>&nbsp;</p>
                      <p>&nbsp;</p>
                      <div class="buttons is-centered">
                        <button class="button is-primary" @click="prevStep('step3')" ><mdicon name="arrow-left-circle-outline" />&nbsp;Previous step</button>
                        <button class="button is-primary" @click="save" >Save and finish</button>
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

    setup(){
      const store = useStore();
      const router = useRouter();
      const check_node_api_http_addr = ref('');
      const network = ref('');
      const ngrok = ref('');
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
        advancedSettings,
        playerOptions,
        textField,
        moveback,
        onPlay

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
      async save(){
        try{

          let user = await this.$userService.getUser(this.configService.configAccount);


          if(user.length){
            await this.$userService.updateUserByAccount(this.configService.configAccount, {
              account: this.configService.configAccount,
              name: this.textField.defaultValue,
              keybase: this.keybase,
              ngrok: this.ngrok,
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
              language: this.localeSelected,
              nodeInternal: this.nodeserverField.nodeInternal,
              email: ''
            });
            if(inserted.length){
              user = inserted;
            }else{
              this.$toast.error("DB Fatal: can not insert DB");
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
          this.$toast.error("Error saving user settings: " + e.message);
          return
        }

      },

    }
  }
</script>
