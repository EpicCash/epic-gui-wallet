<template>
  <input
    class="input"
    type="amount"
    :placeholder="$t('msg.httpSend.sendAmount')"
    required
    autocomplete="off"
    v-model="input"

     />

  <div style="color:red;" v-if="errors.amount">
     {{ errors.amount }}
  </div>
</template>

<script>
  import { ref, computed } from "vue";
  import useFormValidation from "@/modules/useFormValidation";

  export default {
    setup() {
      let input = ref('');
      let defaultValue = ref(null);
      const { validateAmountField, errors } = useFormValidation();

      const validInput = (configService) => {

        defaultValue.value = input.value == '' ? 0 : input.value;

        return validateAmountField("amount", defaultValue.value, configService);
      };

      return { input, errors, defaultValue, validInput };
    },

  };
</script>
