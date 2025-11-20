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
  import useFormValidation from "../../modules/useFormValidation";
  import { inject } from 'vue'

  export default {
    props: ['placeholder', 'required'],
    setup() {
      let input = ref('');
      let defaultValue = ref(null);
      const configService = inject('configService');
      const { validateAccountField, errors } = useFormValidation();

      const validInput = (_configService, exist) => {
        defaultValue.value = input.value == '' ? 'default' : input.value.trim();
        return validateAccountField("account", defaultValue.value, configService, exist);
      };

      return { input, errors, defaultValue, validInput, configService };
    },

  };
</script>
