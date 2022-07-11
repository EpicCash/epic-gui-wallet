<template>

  <section class="section is-main-section">


    <div v-show="store.state.walletListenerService">
      <div class="message is-info">

        <div class="message-header"><p>{{ $t("msg.httpReceive.listening") }}</p></div>
        <div class="message-body">

          <p v-if="store.state.ngrokService">
            Current Ngrok Address:<br/>
            <code>{{ ngrokAddress }}</code>&nbsp;<mdicon @click="copy(ngrokAddress)" name="content-copy" size=16 />
          </p>
          <p v-if="store.state.ngrokService">&nbsp;</p>
          <p v-else>
            Local Address:<br/>
            <code>http(s)://[YOUR IP ADDRESS]:3415</code>
          </p>

          <p v-if="store.state.torService">
            Tor onion Address:<br/>
            <code>{{ onionAddress }}</code>&nbsp;<mdicon @click="copy(onionAddress)" name="content-copy" size=16 />
          </p>
          <p v-else>
            Tor onion Address:<br/>
            <code>Tor not available. Try to restart the wallet listener</code>
          </p>

          <p v-if="proofAddress">&nbsp;</p>
          <p v-if="proofAddress">
            Proof Address:<br/>
            <code>{{ proofAddress }}</code>&nbsp;<mdicon @click="copy(proofAddress)" name="content-copy" size=16 />
          </p>

        </div>

      </div>
      <div class="columns">
        <div class="column is-half">
              <div class="field">
                <div class="control">
                  <button class="button is-primary" @click="stop" :class="{ 'button__loader': isLoading }">
                      <span class="button__text">{{ $t("msg.httpReceive.close") }}</span>
                  </button>
                </div>
              </div>
        </div>
      </div>
    </div>
    <div v-show="!store.state.walletListenerService">
      <div class="message is-warning">
        <div class="message-header"><p>{{ $t("msg.httpReceive.attention") }}</p></div>
        <div class="message-body">
          <p>{{ $t("msg.httpReceive.reachableMsg") }}</p>
        </div>
      </div>
      <div class="columns">
        <div class="column is-half">

            <div class="field">
              <label class="label">{{ $t("msg.password") }}</label>
              <div class="control">
                <PasswordField ref="passwordField" placeholder="********" required="true" name="password" />
              </div>
            </div>

            <div class="field">
              <div class="control">
                <button class="button is-primary" @click="start" :class="{ 'button__loader': isLoading }">
                    <span class="button__text">{{ $t("msg.httpReceive.start") }}</span>
                </button>
              </div>
            </div>

        </div>
      </div>


    </div><!-- end else -->




  </section>

</template>
<script>


import { ref,onMounted } from 'vue';
import { useStore } from '@/store';
import PasswordField from "@/components/form/passwordField";
import useFormValidation from "@/modules/useFormValidation";


const clipboard = window.clipboard;

export default {
  name: "http-receive",
  components: {
    PasswordField,
  },

  setup(){

    const store = useStore();
    const onionAddress = ref('');
    const ngrokAddress = ref('');
    const proofAddress = ref('');
    const passwordField = ref('');
    const { resetFormErrors } = useFormValidation();
    const isLoading = ref(false);

    return {
      store,
      onionAddress,
      ngrokAddress,
      proofAddress,
      passwordField,
      resetFormErrors,
      isLoading
    }
  },
  async mounted(){
    this.onionAddress = await this.getOnionAndProofAddress();
    if(this.store.state.user.ngrok != ''){
      this.ngrokAddress = await this.getNgrokAddress();
    }
  },
  methods: {

    async getNgrokAddress(){

      let ngrokStatus = await this.$ngrokService.checkStatus();
      if(ngrokStatus){
        return this.$ngrokService.getAddress()
      }

    },
    async getOnionAndProofAddress(){
      let addressRes = await this.$walletService.getPubliProofAddress();

      if(addressRes && addressRes.result && addressRes.result.Ok){

        this.proofAddress = addressRes.result.Ok;

        if(this.proofAddress != ''){
          return await window.config.getOnionV3(this.proofAddress);
        }
      }
      return '';
    },

    copy(text){
      window.clipboard.writeText(text);
      this.$toast.show("Copied to clipboard!", {duration:1000});
    },
    async start(){


      this.resetFormErrors();
      let isFormAllValid = [];

      isFormAllValid.push(this.passwordField.validInput());



      //check now requires settings
      if(!isFormAllValid.includes(false)){

        this.isLoading = true;
        const isListen = await this.$walletService.startListen(this.passwordField.defaultValue, true, 'http');
        this.isLoading = false;
        if(isListen && isListen.success){

          this.onionAddress = await this.getOnionAndProofAddress();
          this.ngrokAddress = this.$ngrokService.getAddress();
          this.$toast.success("Wallet listener started");

          this.store.commit('walletListenerService', true);

        }else if(isListen.success == false){

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



    },
    async stop(){

      this.isLoading = true;
      let killed = await this.$walletService.stopListen();
      this.isLoading = false;
      if(killed){
        this.store.commit('walletListenerService', false);
        this.$toast.success("Wallet listener stopped");
      }
    },


  }
}
</script>
