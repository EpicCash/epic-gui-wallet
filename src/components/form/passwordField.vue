<template>
  <input
    class="input"
    type="password"
    :name="name"
    :placeholder="placeholder"
    :required="required"
    autocomplete="off"
    v-model="input" />

  <div style="color:red;" v-if="errors[name]">
     {{ errors[name] }}
  </div>
</template>

<script>
  import { ref, computed } from "vue";
  import useFormValidation from "@/modules/useFormValidation";

  export default {
    props: ['placeholder', 'required', 'repeat', 'name'],
    setup(props) {
      let input = ref('');
      let defaultValue = ref(null);
      const { validatePasswordField, errors } = useFormValidation();

      const validInput = () => {

        defaultValue.value = input.value;

        return validatePasswordField(props.name, defaultValue.value, (props.repeat != undefined ? props.repeat : false));

      };

      return { input, defaultValue, errors, validInput };
    },

  };
</script>
