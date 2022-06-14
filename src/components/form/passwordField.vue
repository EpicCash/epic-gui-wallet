<template>
  <input
    class="input"
    type="password"
    placeholder="********"
    required
    autocomplete="off"
    v-model="input" />

  <div style="color:red;" v-if="errors.password">
     {{ errors.password }}
  </div>
</template>

<script>
  import { ref, computed } from "vue";
  import useFormValidation from "@/modules/useFormValidation";

  export default {
    setup() {
      let input = ref('');
      let defaultValue = ref(null);
      const { validatePasswordField, errors } = useFormValidation();

      const validInput = () => {
        defaultValue.value = input.value;
        return validatePasswordField("password", defaultValue.value);

      };

      return { input, defaultValue, errors, validInput };
    },

  };
</script>
