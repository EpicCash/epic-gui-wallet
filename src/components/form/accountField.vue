<template>
  <input
    class="input"
    type="account"
    placeholder="default"
    required
    autocomplete="off"
    v-model="input" />

  <div style="color:red;" v-if="errors.account">
     {{ errors.account }}
  </div>
</template>

<script>
  import { ref, computed } from "vue";
  import useFormValidation from "@/modules/useFormValidation";

  export default {
    setup() {
      let input = ref('');
      let defaultValue = ref(null);
      const { validateAccountField, errors } = useFormValidation();

      const validInput = (configService) => {

        defaultValue.value = input.value == '' ? 'default' : input.value;
        console.log(defaultValue.value);
        return validateAccountField("account", defaultValue.value, configService);
      };

      return { input, errors, defaultValue, validInput };
    },

  };
</script>
