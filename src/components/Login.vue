<template>
  <section class="section hero is-fullheight is-dark-mode-active">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-two-fifths">
            <div class="card has-card-header-background">
              <header class="card-header" style="justify-content: center;">
                <img src="../assets/img/epiccash-brand-full.png" style="width: 190px; padding: 16px 0px;">
              </header>

              <div class="card-content">

                <form @submit.prevent novalidate>
                  <div class="field">
                    <label class="label">{{ $t("msg.account") }}</label>
                    <div class="control">
                      <AccountField ref="accountField" placeholder="default" required="true" />
                    </div>
                  </div>
                  <div class="field">
                    <label class="label">{{ $t("msg.password") }}</label>
                    <div class="control">
                      <PasswordField ref="passwordField" placeholder="********" required="true" name="password" />
                    </div>
                  </div>
                  <hr>
                  <div class="field is-grouped" style="justify-content: center;">
                    <div class="control">
                      <button type="submit" class="button is-primary" :class="{ 'button__loader': isLoading }" @click.prevent="login">
                        <span class="button__text">{{ $t("msg.login_") }}</span>
                      </button>
                    </div>
                    <div class="control">
                      <router-link class="button is-outlined is-primary" to="/create">
                        {{ $t("msg.new.create") }}
                      </router-link>
                    </div>
                    <div class="control">
                      <router-link class="button is-outlined is-primary" to="/restore">
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
    const canLogin = ref(true);
    const isLoading = ref(false);
    const { resetFormErrors } = useFormValidation();

    return {
      store,
      router,
      passwordField,
      accountField,
      canLogin,
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

        this.canLogin = await this.$walletService.start(this.passwordField.defaultValue, false);


        if(this.canLogin.success){

          if(this.configService.config['walletlisten_on_startup']){

            const isListen = await this.$walletService.startListen(this.passwordField.defaultValue, true, 'http');

            if(isListen && isListen.success){
              this.$toast.success("Wallet listener started");
              this.store.commit('walletListenerService', true);
            }else{
              this.$toast.error("Error starting wallet listener");
              this.store.commit('walletListenerService', false);
            }

            if(isListen && isListen.tor){
              this.$toast.success("Tor started");
              this.store.commit('torService', true);
            }else{
              this.$toast.error("Tor not started");
              this.store.commit('torService', false);
            }
          }

          //load account else wizard
          let user = await this.$userService.getUser(this.accountField.defaultValue);
          if(user.length && action != 'settings'){
            this.store.commit('user', user[0]);
          }else{
            this.router.push('/setupwizard');
            return;
          }


          this.isLoading = false;
          this.emitter.emit('app.accountLoggedIn');

        }else{
          this.$toast.error(this.canLogin.msg.message);
        }

        this.isLoading = false;

      }else{
        return;
      }

    },

  }
}
</script>
