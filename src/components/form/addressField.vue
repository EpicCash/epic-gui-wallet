<template>
  <input
    class="input"
    type="address"
    placeholder="Recipient Address"
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
      let addressType = ref('http');
      let defaultValue = ref(null);

      const { validateAddressField, errors } = useFormValidation();


      const validInput = () => {

        defaultValue.value = input.value;
        return validateAddressField("address", defaultValue.value, addressType.value);
      };

      const setValue = (value, type) => {
        input.value = value;
        addressType.value = type;
      };

      return { input, errors, defaultValue, validInput, setValue, addressType };
    },

  };
</script>
