<template>
  <div class="select" >
      <select v-model="input">
        <option value="mainnet">Mainnet</option>
        <option value="floonet">Floonet</option>
        <option value="usernet">Usernet</option>
      </select>

  </div>
  <div style="color:red;" v-if="errors.network">
     {{ errors.network }}
  </div>
</template>

<script>
  import { ref, computed } from "vue";
  import useFormValidation from "@/modules/useFormValidation";

  export default {
    setup() {
      const input = ref('mainnet');
      const defaultValue = ref(null);
      const shortName = ref('');


      const { validateNetworkField, errors } = useFormValidation();

      const validInput = (configService) => {

        defaultValue.value = input.value == '' ? 'mainnet' : input.value;

        if(input.value == 'floonet'){
          shortName.value = 'floo';
        }else if(input.value == 'usernet'){
          shortName.value = 'user';
        }else{
          shortName.value = 'main';
        }

        return validateNetworkField("network", defaultValue.value, configService);
      };

      return { input, errors, defaultValue, shortName, validInput };
    },

  };
</script>
