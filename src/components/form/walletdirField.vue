<template>


  <p class="button is-link is-success is-outlined" v-if="defaultValue"><br/><strong>{{ defaultValue }}</strong></p>
  <a class="button is-link is-outlined" @click="selectDir">{{ $t("msg.create.select") }}</a>

  <div style="color:red;" v-if="errors.walletdir">
     {{ errors.walletdir }}
  </div>
</template>

<script>
  import { ref, computed } from "vue";
  import useFormValidation from "@/modules/useFormValidation";

  export default {

    setup() {

      const defaultValue = ref('');
      const selectedDir = ref('');

      const { validateDirField, errors } = useFormValidation();

      const validInput = (configService) => {
        defaultValue.value = selectedDir.value == '' ? configService.defaultAccountWalletdir : selectedDir.value  ;
        return validateDirField("walletdir", defaultValue.value, configService);
      };

      return { errors, defaultValue, validInput, selectedDir };
    },
    methods:{

      async selectDir(){

          let customHomedir = await window.api.showOpenDialog();
          if(customHomedir.canceled == false){
            this.selectedDir = customHomedir.filePaths[0]

          }
      },

    }

  };
</script>
