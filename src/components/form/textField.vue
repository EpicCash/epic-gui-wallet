<template>
  <input
    class="input"
    type="input"
    :placeholder="placeholder"
    :required="required"

    autocomplete="off"
    v-model="input" />

  <div style="color:red;" v-if="errors[errorName]">
     {{ errors[errorName] }}
  </div>
</template>

<script>
  import { ref, computed } from "vue";
  import useFormValidation from "@/modules/useFormValidation";

  export default {
    props: ['placeholder', 'required', 'fieldname'],
    setup(props) {
      let input = ref('');
      let defaultValue = ref(null);
      let errorName = ref(props.fieldname);
      
      const { validateTextField, errors } = useFormValidation();

      const validInput = (name) => {

        defaultValue.value = input.value;

        return validateTextField(name, defaultValue.value);
      };

      return { input, errors, defaultValue, validInput, errorName };
    },

  };
</script>
