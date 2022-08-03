<template>

  <section class="section is-main-section">


    <div v-show="store.state.walletListenerService">
      <div class="columns">
        <div class="column is-two-thirds">
          <div class="message is-info">

            <div class="message-header"><p>{{ $t("msg.httpReceive.listening") }}</p></div>
            <div class="message-body">

              <p v-if="store.state.ngrokService">
                {{ $t("msg.httpReceive.current_ngrok_address") }}:<br/>
                <code>{{ ngrokAddress }}</code>&nbsp;<mdicon class="is-clickable" @click="copy(ngrokAddress)" name="content-copy" size=16 />&nbsp;<mdicon class="is-clickable" @click="qrcode(ngrokAddress, 'ngrok')" name="qrcode-scan" size=16 />


              </p>
              <p v-if="store.state.user.ngrok_force_start" class="help">{{ $t("msg.httpReceive.session_end", store.state.ngrokTunnelLifetime) }}</p>

              <p v-if="store.state.ngrokService">&nbsp;</p>
              <p v-else>
                {{ $t("msg.httpReceive.local_address") }}:<br/>
                <code>http://{{ publicIp.ip }}:3415</code>&nbsp;<mdicon v-if="portIsForwarded" name="flag-checkered" style="color:hsl(141, 53%, 53%);" title="port is open" /><mdicon v-else name="flag-checkered" style="color:hsl(348, 100%, 61%);" title="port is closed" />&nbsp;<mdicon class="is-clickable" @click="copy('http://' + publicIp.ip + ':3415')" name="content-copy" size=16 />
              </p>
              <p v-if="!store.state.ngrokService">&nbsp;</p>

              <p v-if="store.state.torService">
                {{ $t("msg.httpReceive.tor_onion_address") }}:<br/>
                <code>{{ onionAddress }}</code>&nbsp;<mdicon @click="copy(onionAddress)" name="content-copy" size=16 />&nbsp;<mdicon class="is-clickable" @click="qrcode(onionAddress, 'TOR')" name="qrcode-scan" size=16 />
              </p>
              <p v-else>
                {{ $t("msg.httpReceive.tor_onion_address") }}:<br/>
                <code>{{ $t("msg.httpReceive.tor_not_available") }}</code>
              </p>

            </div>

          </div>

          <div class="message is-info">
            <div class="message-header"><p>{{ $t("msg.httpReceive.proof_address") }}</p></div>
            <div class="message-body">
              <code>{{ proofAddress }}</code>&nbsp;<mdicon @click="copy(proofAddress)" name="content-copy" size=16 />&nbsp;<mdicon class="is-clickable" @click="qrcode(proofAddress, 'proof')" name="qrcode-scan" size=16 />
            </div>
          </div>

        </div>
        <div class="column">
          <div class="message is-info">

            <div class="message-header"><p v-if="addressTypeHeader">{{ $t("msg.httpReceive.your_qrcode", [addressTypeHeader]) }}</p><p v-else>{{ $t("msg.httpReceive.click_qrcode_icon") }}</p></div>
            <div v-show="addressTypeHeader"  class="message-body">
              <canvas id="qrcodeCanvas"></canvas>
            </div>
          </div>
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
              <div class="control has-icons-right">
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
  watch: {
      'store.state.ngrokTunnels': function (newVal) {

        if(newVal){
          this.ngrokAddress = newVal.public_url;
        }
      },

  },
  setup(){

    const store = useStore();
    const onionAddress = ref('');
    const ngrokAddress = ref('');
    const proofAddress = ref('');
    const passwordField = ref('');
    const { resetFormErrors } = useFormValidation();
    const isLoading = ref(false);
    const vueCanvas = ref(null);
    const addressTypeHeader = ref('');
    const publicIp = ref('');
    const portIsForwarded = ref(false);

    return {
      store,
      onionAddress,
      ngrokAddress,
      proofAddress,
      passwordField,
      resetFormErrors,
      isLoading,
      addressTypeHeader,
      publicIp,
      portIsForwarded

    }
  },

  async mounted(){

    this.publicIp = await window.config.getPublicIp();
    this.portIsForwarded = await window.config.isPortReachable();

    this.onionAddress = await this.getOnionAndProofAddress();
    if(this.store.state.user.ngrok != '' || this.store.state.user.ngrok_force_start){
      this.ngrokAddress = await this.getNgrokAddress();
    }

    var c = document.getElementById("qrcodeCanvas");
    this.vueCanvas = c;

    this.tunnelLifetime = this.store.state.ngrokTunnelLifetime;



  },
  methods: {
    async qrcode(text, addressType){

      this.addressTypeHeader = addressType;
      this.vueCanvas = document.getElementById("qrcodeCanvas");
      window.nodeQr.toCanvas(this.vueCanvas, text, function (error) {
        if (error) console.error('HttpReceive.qrcode', error)


      })
    },
    async getNgrokAddress(){
      return this.$ngrokService.getAddress()
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
          this.emitter.emit('app.ngrokStart');
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
        this.emitter.emit('app.ngrokStop');
        this.store.commit('walletListenerService', false);
        this.$toast.success("Wallet listener stopped");
      }
    },


  }
}
</script>
