<template>


    <section class="section is-main-section">


      <div v-if="seeds.length">
        <p class="has-text-weight-semibold has-text-warning">
          {{ $t('msg.create.backupNote') }}
        </p>
        <p>&nbsp;</p>
        <div class="tags">
          <span style="color:#000000" class="tag is-light is-medium is-rounded is-link" v-for="seed in seeds" :key="seed">{{seed}}</span>
        </div>
      </div>

      <div v-else>

        <div class="field">
          <label class="label">{{ $t("msg.password") }}</label>
          <div class="control">
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
  setup() {

    const passwordField = ref('');
    const { resetFormErrors } = useFormValidation();
    const seeds = ref([]);


    return {
      passwordField,
      resetFormErrors,
      seeds
    }

  },


  methods: {
    async start(){

      this.resetFormErrors();

      let isFormAllValid = [];

      isFormAllValid.push(this.passwordField.validInput());

      if(!isFormAllValid.includes(false)){
        let res = await this.$walletService.getMnemonic(this.passwordField.defaultValue);
        if(res && res.result && res.result.Ok){
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
