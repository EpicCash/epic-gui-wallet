<template>
  <input
    class="input"
    type="account"
    :placeholder="placeholder"
    :required="required"
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
    props: ['placeholder', 'required'],
    setup() {
      let input = ref('');
      let defaultValue = ref(null);

      const { validateAccountField, errors } = useFormValidation();

      const validInput = (configService, exist) => {

        defaultValue.value = input.value == '' ? 'default' : input.value;

        return validateAccountField("account", defaultValue.value, configService, exist);
      };

      return { input, errors, defaultValue, validInput };
    },

  };
</script>
