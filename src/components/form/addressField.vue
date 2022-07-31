<template>
  <input
    class="input"
    type="address"
    :placeholder="$t('msg.httpSend.address')"
    autocomplete="off"
    required
    v-model="input"
    @keyup="$emit('keyup', $event.target.value)"

     />

  <div style="color:red;" v-if="errors.address">
     {{ errors.address }}
  </div>
</template>

<script>
  import { ref, computed } from "vue";
  import useFormValidation from "@/modules/useFormValidation";

  export default {
    emits: ["keyup"], // <--- add this line
    setup(_,{ emit }) {
      let input = ref('');

      let defaultValue = ref(null);

      const { validateAddressField, errors } = useFormValidation();


      const validInput = () => {

        defaultValue.value = input.value;
        return validateAddressField("address", defaultValue.value);
      };

      const setValue = (value) => {
        input.value = value;

      };

      return { input, errors, defaultValue, validInput, setValue };
    },

  };
</script>
