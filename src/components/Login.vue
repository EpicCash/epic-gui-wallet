<template >
  <section class="section hero is-fullheight is-dark-mode-active" >
    <div class="hero-body" >
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-two-fifths">
            <div class="card has-card-header-background" style="min-width:380px;">
              <header class="card-header" style="justify-content: center;">
                <img src="../assets/img/epiccash-brand-full.png" style="width: 190px; padding: 16px 0px;">
              </header>

              <div class="card-content">

                <form @submit.prevent novalidate>
                  <div class="field">
                    <label class="label">{{ $t("msg.account.account") }}</label>
                    <div class="control">
                      <AccountField ref="accountField" placeholder="default" required="true" />
                    </div>
                  </div>
                  <div class="field">
                    <label class="label">{{ $t("msg.password") }}</label>
                    <div class="control has-icons-right">
                      <PasswordField ref="passwordField" placeholder="********" required="true" name="password" />
                    </div>
                  </div>

                  <div class="field is-grouped" style="justify-content: center;display: flex;flex-wrap: wrap;flex-direction: row;">
                    <div class="control" style="margin-top:12px;">
                      <button type="submit" class="button is-primary" :class="{ 'button__loader': isLoading }" @click.prevent="login">
                        <span class="button__text">{{ $t("msg.login_") }}</span>
                      </button>
                    </div>
                    <div class="control" style="margin-top:12px;">
                      <router-link class="button is-outlined" to="/create">
                        {{ $t("msg.new.create") }}
                      </router-link>
                    </div>
                    <div class="control" style="margin-top:12px;">
                      <router-link class="button is-outlined" to="/restore">
                        {{ $t("msg.restore.recover") }}
                      </router-link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="hero-foot has-text-centered">
      <div class="logo"></div>
    </div>

  </section>
</template>

<script>


import { ref } from 'vue';
import PasswordField from "@/components/form/passwordField";
import AccountField from "@/components/form/accountField";
import useFormValidation from "@/modules/useFormValidation";
import { useRouter } from '@/router';
import { useStore } from '@/store';


/*.addEventListener("focus", function(event) {
    // here is the Vue code
    //console.log('window loaded', event.getModifierState("CapsLock"));
});
*/
export default {
  name: "login",
  components: {
    PasswordField,
    AccountField,
  },
  setup() {

    const store = useStore();
    const router = useRouter();
    const passwordField = ref('');
    const accountField = ref();
    const isLoading = ref(false);
    const { resetFormErrors } = useFormValidation();

    return {
      store,
      router,
      passwordField,
      accountField,
      isLoading,
      resetFormErrors,
    }
  },

  methods: {

    async login(){



      this.resetFormErrors();
      let isFormAllValid = [];

      isFormAllValid.push(this.passwordField.validInput());
      isFormAllValid.push(this.accountField.validInput(this.configService));

      //check now requires settings
      if(!isFormAllValid.includes(false)){

        this.isLoading = true;

        //first check config and setup
        let action = await this.configService.startCheck(this.accountField.defaultValue);

        //App has started - first close running wallet and node server process

        await this.configService.killEpicProcess();



        let canLogin = await this.$walletService.start(this.passwordField.defaultValue, this.configService.config['firstTime']);
        //console.log('canLogin do login', canLogin);
        if(canLogin.success){

          //load user account settings first
          let user = await this.$userService.getUser(this.accountField.defaultValue);
          window.debug ? console.log('LOGIN USER:', user) : null;
          if(user.length && action != 'settings'){
            this.store.commit('user', user[0]);
          }else{
            this.router.push('/setupwizard');
            return;
          }

          console.log('start node before wallet listener');
          await this.emitter.emit('app.nodeStart');

          if(this.configService.config['walletlisten_on_startup']){

            const isListen = await this.$walletService.startListen(this.passwordField.defaultValue, true, 'http');

            //start epicbox, will be executed when node has synced status
            if(this.configService.config['epicbox_domain'] != undefined && this.configService.config['epicbox_domain'] != '' ){
              await this.emitter.emit('app.startEpicbox', this.passwordField.defaultValue);
            }

            if(isListen && isListen.success){
              this.$toast.success(this.$t("msg.login.listener_started"));
              this.store.commit('walletListenerService', true);
            }else{
              this.$toast.error(this.$t("msg.login.error_listener_started"));
              this.store.commit('walletListenerService', false);
            }

            if(isListen && isListen.tor){
              this.$toast.success(this.$t("msg.login.tor_started"));
              this.store.commit('torService', true);
            }else{
              this.$toast.error(this.$t("msg.login.error_tor_started"));
              this.store.commit('torService', false);
            }

            console.log('all started');



          }




          this.isLoading = false;
          this.emitter.emit('app.accountLoggedIn');

        }else{
          //console.log(canLogin);
          this.isLoading = true;
          this.$walletService.stopWallet();
          this.$toast.error(canLogin.msg.message);



        }

        this.isLoading = false;

      }else{
        return;
      }

    },

  }
}
</script>
