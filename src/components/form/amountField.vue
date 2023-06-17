<template>
  <input
    class="input"
    type="amount"
    :placeholder="$t('msg.httpSend.sendAmount')"
    required
    autocomplete="off"
    v-model="input"
    @keyup="getFee"
     />
  <div v-if="fee > 0">{{$t("msg.transaction.transaction_fee")}}: {{fee}} EPIC</div>
  <div style="color:red;" v-if="errors.amount">
     {{ errors.amount }}
  </div>
</template>

<script>
  import { ref, computed } from "vue";
  import useFormValidation from "@/modules/useFormValidation";

  export default {
    setup() {
      let input = ref('');
      let defaultValue = ref(null);
      let fee = ref(0);
      const { validateAmountField, errors } = useFormValidation();

      const validInput = (configService) => {

        defaultValue.value = input.value == '' ? 0 : input.value.trim();

        return validateAmountField("amount", defaultValue.value, configService);
      };

      return { input, errors, defaultValue, validInput, fee };
    },

    methods: {

      async getFee(){

        let tx_data = {

          "src_acct_name": null,
          "amount": this.input * 100000000,
          "message": "",
          "minimum_confirmations": 3,
          "max_outputs": 500,
          "num_change_outputs": 1,
          "selection_strategy_is_use_all": false,
          "target_slate_version": null,
          "ttl_blocks": null,
          "estimate_only": true,
          "payment_proof_recipient_address": null,


        }

        let res = await this.$walletService.issueSendTransaction(tx_data)

        if(res && res.result && res.result.Ok){

          this.fee = res.result.Ok.fee / 100000000;

        }



      },



    }

  };
</script>
