<template>
  <div class="field has-addons">
    <div class="control is-expanded">
      <input
        class="input"
        type="amount"
        :placeholder="t('msg.httpSend.sendAmount')"
        required
        autocomplete="off"
        v-model="input"
        @keyup="getFee"
         />
    </div>
    <div class="control">
      <a style="line-height:40px;padding-left:12px;text-decoration: underline;" class="is-flex is-vcentered" @click="sendAll">
      {{t("msg.transaction.sendall")}}
      </a>
    </div>
  </div>
  <div v-if="fee > 0">{{t("msg.transaction.transaction_fee")}}: {{fee}} EPIC</div>
  <div style="color:red;" v-if="errors.amount">
     {{ errors.amount }}
  </div>
</template>

<script>
  import { ref, computed } from "vue";
  import { useI18n } from 'vue-i18n';
  import useFormValidation from "../../modules/useFormValidation";

  export default {
    setup() {
      let input = ref('');
      let defaultValue = ref(null);
      let fee = ref(0);

      const { validateAmountField, errors } = useFormValidation();
      const { t } = useI18n();
      const validInput = (configService) => {

        defaultValue.value = input.value == '' ? 0 : input.value.trim();

        return validateAmountField("amount", defaultValue.value, configService);
      };

      return { input, errors, defaultValue, validInput, fee, t };
    },

    methods: {
      async sendAll(){

        let summary = await this.$walletService.getSummaryInfo(3, true);
        if(summary && summary.result && summary.result.Ok){
          let data = summary.result.Ok;
          let spendable = data[1]['amount_currently_spendable'];

          //get fee, if we send all this will return an not enough funds error
          let tx_data = {
            "src_acct_name": null,
            "amount": spendable,
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

          let res = await this.$walletService.issueSendTransaction(tx_data);
          //use this error to calc max amount to send
          if(res && res.error){
            try{
              let message = JSON.parse(res.error.message.split("NotEnoughFunds:")[1]);
              this.input = (spendable - (message.needed - spendable)) / 100000000;
              await this.getFee();
            }catch(e){
              console.log(e);
            }

          }
        }

      },
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
