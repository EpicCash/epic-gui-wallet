<template>
  <input
    class="input"
    type="proof_address"
    placeholder="Recipient proof address"
    autocomplete="off"
    v-model="input"

     />

  <div style="color:red;" v-if="errors.proof_address">
     {{ errors.proof_address }}
  </div>
</template>

<script>
  import { ref, computed } from "vue";
  import useFormValidation from "@/modules/useFormValidation";

  export default {
    setup() {
      let input = ref('');
      let defaultValue = ref(null);
      const { validateProofAddressField, errors } = useFormValidation();

      const validInput = () => {

        defaultValue.value = input.value;

        return validateProofAddressField("proof_address", defaultValue.value);
      };

      const setValue = (value) => {
        input.value = value;
      };

      return { input, errors, defaultValue, validInput, setValue };
    },

  };
</script>
