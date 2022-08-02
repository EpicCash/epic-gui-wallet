<template>


    <section class="section is-main-section">


      <div v-show="seeds.length > 0">
        <p class="has-text-weight-semibold has-text-warning">
          {{ $t('msg.create.backupNote') }}
        </p>
        <p>&nbsp;</p>
        <div class="tags" style="justify-content: center;">
          <span style="color:#000000" class="mnemonic-word tag is-light is-medium is-rounded is-link" v-for="seed in seeds" :key="seed">{{seed}}<span class="space"> </span></span>
        </div>
        <div style="text-align: center;">
          <canvas id="qrcodeCanvas" ></canvas>
        </div>
      </div>


      <div v-show="seeds.length == 0">

        <div class="field">
          <label class="label">{{ $t("msg.password") }}</label>
          <div class="control has-icons-right">
            <PasswordField ref="passwordField" placeholder="********" required="true" name="password" />
          </div>
        </div>

        <div class="field" >
          <div class="control">
            <button class="button is-primary" @click="start">
              {{ $t("msg.check.start") }}
            </button>
          </div>

        </div>
      </div>

    </section>

</template>

<script>

import { ref } from 'vue';
import PasswordField from "@/components/form/passwordField";
import useFormValidation from "@/modules/useFormValidation";

export default {
  name: "seed",
  components: {
    PasswordField
  },
  watch: {
    qrText: function (val) {
      this.qrcode(val);
    }
  },
  setup() {

    const passwordField = ref('');
    const { resetFormErrors } = useFormValidation();
    const seeds = ref([]);
    const vueCanvas = ref(null);
    const qrText = ref('');

    return {
      passwordField,
      resetFormErrors,
      seeds,
      qrText
    }

  },


  methods: {
    async qrcode(text){

      this.vueCanvas = document.getElementById("qrcodeCanvas");
      window.nodeQr.toCanvas(this.vueCanvas, text, function (error) {
        if (error) console.error('HttpReceive.qrcode', error)
      })
    },
    async start(){

      this.resetFormErrors();

      let isFormAllValid = [];

      isFormAllValid.push(this.passwordField.validInput());

      if(!isFormAllValid.includes(false)){
        let res = await this.$walletService.getMnemonic(this.passwordField.defaultValue);
        if(res && res.result && res.result.Ok){
          this.qrText = res.result.Ok;
          let valueChunks = res.result.Ok.split(" ").map(item => item.trim());
          this.seeds = valueChunks;
        }else{
          this.$toast.error(res.error.message);
        }
      }

    },

  }
}
</script>
