<template>

  <section class="section hero is-fullheight">
      <section class="hero">
        <div class="hero-body">


          <div v-if="page==='addSeeds'" class="container">
            <div class="columns is-centered">
              <div class="column is-three-quarters">
                <div class="card has-card-header-background">
                  <header class="card-header" style="justify-content: center;">
                    <img src="../assets/img/epiccash-brand-full.png" style="width: 190px; padding: 16px 0px;">
                  </header>
                  <div id="restoreMnemonicWords" class="card-content">
                    <h2 class="title" style="text-align: center;">{{ $t('msg.restore.title') }} {{ $t('msg.step_of', [1,3]) }}</h2>

                    <div class="field has-addons-fullwidth" style="margin-bottom: 24px;">
                      <div class="control">
                        <input @keyup="keyEvent" v-on:keyup.enter="add" v-model="search" :placeholder="$t('msg.restore.search_placeholder')" type="text" class="input" style="width: 100%;">

                      </div>
                    </div>
                    <p class="animated bounce has-text-weight-semibold has-text-warning" style="animation-iteration-count: 2; margin-bottom: 24px; text-align: center; color: #d19944!important;">
                      {{ $t('msg.restore.addSeedsInfo') }}
                    </p>
                    <div style="margin-bottom:20px;">
                      <div class="tags" style="justify-content: center;">

                        <span class="tag is-light is-medium is-rounded is-link" v-for="word in wordList" :key="word.id">
                          <a style="color: rgb(0, 0, 0);" @click="add(word)" >{{ word }}</a>
                        </span>
                        <p v-if="wordList.length == 0">
                          ...
                        </p>
                      </div>
                    </div>

                    <div class="buttons is-centered">
                      <button class="button is-primary" @click="reset"><mdicon name="edo-variant" /> {{ $t("msg.reset") }}</button>
                      <button class="button is-primary" @click="addall"><mdicon name="plus-box-multiple-outline" />{{ $t("msg.addall") }}</button>



                    </div>
                    <p class="has-text-weight-semibold has-text-warning" style="margin-bottom: 24px; text-align: center; color: #d19944!important;">
                      {{ $t('msg.restore.yourSeedsInfo') }} (<span v-bind:class="{'has-text-danger':seeds.length>total}" >{{seeds.length}}</span>/{{total}})
                    </p>
                    <div class="tags" style="justify-content: center;">
                      <span style="color:#000000" class="tag is-light is-medium is-rounded is-link" v-for="seed in seeds" :key="seed">{{seed}}</span>

                    </div>
                    <div class="buttons is-centered">
                      <router-link class="button is-primary" :to="{name: fromRoute}">
                        <mdicon name="arrow-left-bold-hexagon-outline" />
                        {{ $t("msg.back") }}
                      </router-link>
                      <button :disabled="seeds.length<=0" class="button is-primary" @click="delete_"><mdicon name="delete" />{{ $t('msg.delete') }}</button>

                      <button :disabled="!enoughSeeds" class="button is-primary" @click="page='addPassword'">
                        <mdicon name="arrow-right-bold-hexagon-outline" />{{ $t('msg.restore.added') }}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-else-if="page === 'addPassword'" class="container">
            <div class="columns is-centered">
              <div class="column is-three-quarters">
                <div class="card has-card-header-background">
                  <header class="card-header" style="justify-content: center;">
                    <img src="../assets/img/epiccash-brand-full.png" style="width: 190px; padding: 16px 0px;">
                  </header>
                  <div id="restoreMnemonicWords" class="card-content">
                    <h2 class="title" style="text-align: center;">{{ $t('msg.restore.title') }} {{ $t('msg.step_of', [2,3]) }}</h2>
                    <p class="has-text-weight-semibold has-text-warning" style="color: #d19944!important;margin-bottom: 24px;">
                      {{ $t('msg.restore.create_new') }}
                    </p>

                    <div class="field">
                        <label class="label">{{ $t('msg.account.account') }}</label>
                        <div class="control">
                          <AccountField ref="accountField" placeholder="default" />
                          <p class="help">{{ $t('msg.account.only_letter') }} <!----></p>
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">{{ $t('msg.restore.newPassword') }}<span class="required">*</span></label>
                        <div class="control has-icons-right">
                          <PasswordField ref="passwordField" required="true" name="password"  />
                        </div>
                    </div>

                    <div class="field">
                        <label class="label">{{ $t('msg.passwordAgain') }}<span class="required">*</span></label>
                        <div class="control has-icons-right">
                          <PasswordField ref="passwordField2" required="true" :repeat="passwordField ? passwordField.input : null" name="password2"  />
                        </div>
                    </div>


                    <div class="field">
                      <div class="control">
                          <a class="icon-text" style="font-size:0.8rem;" @click="toggleAdvancedSettings" >
                            <mdicon size="18" v-if="!advancedSettings" name="menu-right" />
                            <mdicon size="18" v-else name="menu-down" />
                            {{ $t('msg.custom_settings') }}
                          </a>
                        </div>
                    </div>


                      <div class="card" v-bind:class="{'is-hidden':!advancedSettings}" >
                        <div class="card-content">
                         <div class="content">
                          <div class="field">
                              <label class="label">{{ $t('msg.restore.walletLocation') }}</label>

                              <WalletdirField ref="walletdirField" />

                          </div>
                          <div class="field">
                              <label class="label">{{ $t("msg.settings.network") }}</label>
                              <div class="control">
                                <NetworkField ref="networkField" />
                              </div>
                          </div>
                        </div>
                      </div>

                      </div>



                    <div class="buttons is-centered">
                        <button class="button is-primary" @click="page='addSeeds'"><mdicon name="arrow-left-bold-hexagon-outline" />{{ $t('msg.restore.change_seed') }}</button>
                        <button class="button is-primary" @click="initR" >{{ $t('msg.restore.recover') }}</button>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-else-if="page==='restored'" class="container">
            <div class="columns is-centered">
              <div class="column is-three-quarters">
                <div class="card has-card-header-background">
                  <header class="card-header" style="justify-content: center;">
                    <img src="../assets/img/epiccash-brand-full.png" style="width: 190px; padding: 16px 0px;">
                  </header>
                  <div id="restoreMnemonicWords" class="card-content">
                    <h2 class="title" style="text-align: center;">{{ $t('msg.restore.title') }} {{ $t('msg.step_of', [3,3]) }}</h2>
                    <p class="has-text-weight-semibold has-text-warning" style="color: #d19944!important;margin-bottom: 24px;">
                      {{ $t('msg.restore.wallet_recovered') }}
                    </p>

                    <div class="buttons is-centered">
                      <router-link class="button is-outlined is-primary" to="/login">
                        {{ $t("msg.login_") }}
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>

      </section>
    </section>


</template>

<script>


  import { ref, computed, onMounted } from 'vue';
  import { useRouter } from '@/router';
  import { useRoute } from 'vue-router';
  import AccountField from "@/components/form/accountField";
  import PasswordField from "@/components/form/passwordField";
  import WalletdirField from "@/components/form/walletdirField";
  import NetworkField from "@/components/form/networkField";
  import useFormValidation from "@/modules/useFormValidation";

  export default {
    name: "restore",
    components: {
      PasswordField,
      AccountField,
      WalletdirField,
      NetworkField,
    },
    setup(){
      const router = useRouter();
      const route = useRoute();
      const wordList = ref([]);
      const seeds = ref([]);
      const enoughSeeds = ref(false);
      const total = ref(24);
      const page = ref('addSeeds');//ref('addSeeds');//
      const accountField = ref();
      const passwordField = ref('');
      const passwordField2 = ref('');
      const walletdirField = ref('');
      const search = ref('');
      const networkField = ref('');
      const { resetFormErrors } = useFormValidation();
      const advancedSettings = ref(false);
      const newseeds = ref([]);
      const fromRoute = route.params.from ? route.params.from : 'login';


      return{
        router,
        wordList,
        seeds,
        enoughSeeds,
        total,
        page,
        search,
        accountField,
        passwordField,
        passwordField2,
        walletdirField,
        resetFormErrors,
        advancedSettings,
        networkField,
        fromRoute
      }
    },
    watch: {

        seeds: {
          deep: true,
          immediate:true,
          handler(newVal, oldVal){

            if(newVal.length == this.total){
              this.enoughSeeds = true
            }else{
              this.enoughSeeds = false
            }

          }
        }
    },

    methods: {
      toggleAdvancedSettings(){

        this.advancedSettings = !this.advancedSettings;
      },

      keyEvent(key){
        let value = key.target.value;
        let valueChunks = value.split(" ").map(item => item.trim());
        this.wordList = [];

        valueChunks.forEach(element => {

          if(element.length >= 2) {
            let filtered = this.mnemonicWords.filter(function (str) { return new RegExp('^' + element).test(str); });

            //if user paste more than one word then find only exact matches
            if(valueChunks.length >= 2){
              filtered = this.mnemonicWords.filter(function (str) { return new RegExp('^' + element + '$').test(str); });
            }

            //merge arrays
            this.wordList = [...this.wordList, ...filtered];

          }
        });


      },
      clearup(){
        this.enoughSeeds = false;
        this.seeds = [];
        this.search = '';
      },

      async initR(){

        this.resetFormErrors();
        let isFormAllValid = [];
        let userhomedir = '';
        //check if not exist => false
        isFormAllValid.push(this.passwordField.validInput());
        isFormAllValid.push(this.passwordField2.validInput());
        //only recover for non existing acount yet
        isFormAllValid.push(this.accountField.validInput(this.configService, true));
        isFormAllValid.push(this.walletdirField.validInput(this.configService));
        isFormAllValid.push(this.networkField.validInput());

        //we create a complete new wallet
        if(!isFormAllValid.includes(false)){

          userhomedir = window.nodePath.join(this.walletdirField.defaultValue, this.accountField.defaultValue);

          if(this.accountField.defaultValue == 'default'){
            userhomedir = window.nodePath.join(this.walletdirField.defaultValue);
          }

          let walletRecoverDir = window.nodePath.join(userhomedir, this.networkField.shortName);

          let recovered = await this.$walletService.recover(this.seeds.join(' '), this.passwordField.defaultValue, this.networkField.defaultValue, walletRecoverDir)
          if(recovered && !recovered.success){
            this.$toast.error(recovered.msg, {duration:false});
          }else{
            //save new account settings and run a check against recoverd wallet
            if(await this.configService.updateAppConfig('account_dirs', {
                account: this.accountField.defaultValue,
                userhomedir: userhomedir,
                network: this.networkField.defaultValue,
                isdefault: this.accountField.defaultValue == 'default' ? true : false
              })){
              let action = await this.configService.startCheck(this.accountField.defaultValue);
              if(action === 'settings'){
                //this.newseeds = recovered.msg.split(' ');
                this.page = 'restored'
              }else{
                this.$toast.error(this.$t('msg.restore.recover_fail', [action]), {duration:false});
              }

            }else{
              this.$toast.error(this.$t('msg.restore.fatal_app'), {duration:false});
            }
          }

        }else{
          return;
        }


      },
      add(word){
        this.seeds.push(word)

        if(this.seeds.length == this.total){
            this.enoughSeeds = true
        }else{
            this.enoughSeeds = false
        }

      },
      delete_(){
        if(this.seeds.length > 0){
          this.seeds.pop();
        }

      },
      addall(){
        //copy array without vue reference object
        this.seeds = Array.from(this.wordList);
      },
      reset(){
        this.clearup()
      },
      toLogin(recovered){
        this.page = 'addSeeds';
        this.clearup();
        this.emitter.emit('toLogin', recovered);
      }
    }
  }
</script>
