<template>


  <section class="section hero is-fullheight">
      <section class="hero">
        <div class="hero-body">

          <div v-show="step==='step1'" class="container">


            <div class="columns is-centered">
              <div class="column is-three-quarters">
                <div class="card has-card-header-background">
                  <header class="card-header" style="justify-content: center;">
                    <img src="../assets/img/epiccash-brand-full.png" style="width: 190px; padding: 16px 0px;">
                  </header>
                  <div class="card-content">
                      <h2 class="title" style="text-align: center;">Setup Assistant Step 1/3</h2>
                      <h2 class="title is-4" style="color: #d19944!important;margin-bottom: 24px;">
                        Account
                      </h2>

                      <div class="field">
                        <label class="label">Your name</label>

                        <div class="control">
                          <input
                            class="input"
                            type="name"
                            required
                            v-model="name" />
                        </div>
                      </div>

                      <div class="field">
                        <label class="label">Email</label>

                        <div class="control">
                          <input
                            class="input"
                            type="email"
                            required
                            v-model="email" />
                        </div>
                      </div>

                      <div class="field">
                        <label class="label">{{ $t("msg.lang.lang") }}</label>

                        <div class="control">
                          <div class="select">
                            <select v-model="localeSelected">
                              <option v-for="(lang, locale) in langs" :value="locale" :key="lang.id">{{lang}}</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div class="buttons is-centered">
                        <button class="button is-primary" @click="nextStep('step2')" >Next step&nbsp;<mdicon size=22 name="arrow-right-circle-outline" /></button>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div><!-- end step 1 -->

          <div v-show="step==='step2'" class="container">
            <div class="columns is-centered">
              <div class="column is-three-quarters">
                <div class="card has-card-header-background">
                  <header class="card-header" style="justify-content: center;">
                    <img src="../assets/img/epiccash-brand-full.png" style="width: 190px; padding: 16px 0px;">
                  </header>
                  <div class="card-content">
                      <h2 class="title" style="text-align: center;">Setup Assistant Step 2/3</h2>
                      <h2 class="title is-4" style="color: #d19944!important;margin-bottom: 24px;">
                        Network node
                      </h2>

                      <NodeserverField ref="nodeserverField" />



                      <div class="buttons is-centered">
                        <button class="button is-primary" @click="prevStep('step1')" ><mdicon name="arrow-left-circle-outline" />Previous step</button>
                        <button class="button is-primary" @click="nextStep('step3')" >Next step<mdicon name="arrow-right-circle-outline" /></button>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div><!-- end step 2 -->


          <div v-show="step==='step3'" class="container">
            <div class="columns is-centered">
              <div class="column is-three-quarters">
                <div class="card has-card-header-background">
                  <header class="card-header" style="justify-content: center;">
                    <img src="../assets/img/epiccash-brand-full.png" style="width: 190px; padding: 16px 0px;">
                  </header>
                  <div class="card-content">
                      <h2 class="title" style="text-align: center;">Setup Assistant Step 3/3</h2>
                      <h2 class="title is-4" style="color: #d19944!important;margin-bottom: 24px;">
                        Ngrok
                      </h2>

                      <div class="field">
                        <label class="label">Your Authtoken</label>

                        <div class="control">
                          <input
                            class="input"
                            type="ngrok"
                            required
                            v-model="ngrok" />
                        </div>
                      </div>

                      <div class="buttons is-centered">
                        <button class="button is-primary" @click="prevStep('step2')" ><mdicon name="arrow-left-circle-outline" />Previous step</button>
                        <button class="button is-primary" @click="save" >Save and finish</button>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


        </div><!-- end hero-body -->
      </section>
    </section>


</template>
<script>

  import { ref } from 'vue';
  import NodeserverField from "@/components/form/nodeserverField";
  import useFormValidation from "@/modules/useFormValidation";
  import { useRouter } from '@/router';

  export default {
    name: "setup-wizard",
    components: {
      NodeserverField
    },

    setup(){
      const router = useRouter();
      const check_node_api_http_addr = ref('');
      const walletlisten_on_startup = ref(false);
      const network = ref('');
      const ngrok = ref('');
      const locale = ref('en');
      const localeSelected = ref('en');
      const langs = ref([]);
      const errorapi = ref(false);
      const step = ref('step1');

      const name = ref('');
      const email = ref('');

      const { resetFormErrors } = useFormValidation();
      const nodeserverField = ref('');

      return{
        router,
        check_node_api_http_addr,
        walletlisten_on_startup,
        network,
        locale,
        localeSelected,
        langs,
        errorapi,
        step,
        nodeserverField,
        resetFormErrors,
        name,
        email,
        ngrok

      }
    },

    mounted(){

      this.locale = this.configService.config['locale'];
      this.localeSelected = this.configService.config['locale'];
      this.langs = this.configService.langs;

    },
    methods: {
      validateStep(step){
        this.resetFormErrors();
        let isFormAllValid = [];
        let isValid = true;
        switch(step){


          case 'step2':
            isValid = true;

          break;
          case 'step3':
            isFormAllValid.push(this.nodeserverField.validInput());
            isValid = !isFormAllValid.includes(false)
          break;

        }
        return isValid;

      },
      nextStep(step){

        if(this.validateStep(step)){
          this.step = step;
        }
      },
      prevStep(step){
        this.step = step;

      },
      async save(){




        try{

          let inserted = await this.$userService.addUser({
            account: this.configService.configAccount,
            name: this.name,
            email: this.email,
            ngrok: this.ngrok,
            language: this.localeSelected,
            nodeInternal: this.nodeserverField.nodeInternal
          });

          this.configService.updateConfig({
            version: '4.0.0',
            check_node_api_http_addr: this.nodeserverField.defaultValue,
            locale: this.localeSelected,
            firstTime: false,
            walletlisten_on_startup: this.walletlisten_on_startup

          });
          this.configService.checkTomlFile();
          this.$router.push('/login');

        }catch(e){
          this.$toast.error("Error saving user settings: " + e.type);
          return
        }

      },

    }
  }
</script>
