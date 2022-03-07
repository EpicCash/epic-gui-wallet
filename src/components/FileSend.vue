<template>

<div class="modal" :class="{'is-active': showModal}">
  <div class="modal-background" @click="closeModal"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title is-size-4 has-text-link has-text-weight-semibold">{{ $t("msg.send") }}</p>
      <button class="delete" aria-label="close" @click="closeModal"></button>
    </header>
    <section class="modal-card-body">

      <div class="notification is-warning" v-if="errors.length">
        <p v-for="error in errors" :key="error">{{ error }}</p>
      </div>
      <div class="field">
        <label class="label">{{ $t("msg.fileSend.sendAmount") }}</label>
        <div class="control">
          <input class="input" type="text" v-model="amount" placeholder="1">
        </div>
      </div>
       <br/>
      <div class="field is-grouped">
        <div class="control">
          <button class="button is-link" @click="send">{{ $t("msg.fileSend.createTxFile") }}</button>
        </div>
        <div class="control">
          <button class="button is-text" @click="closeModal">{{ $t("msg.cancel") }}</button>
        </div>
      </div>
    </section>
  </div>
</div>

</template>
<script>

const log = window.log
const fs = window.nodeFs;

export default {
  name: "file-send",
  props: {
    showModal: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      errors: [],
      amount: null,
      slateVersion: 0
    }
  },
  watch: {
      errors:function(newVal){
        if(newVal.length > 0){
          setTimeout(()=>this.errors = [],
          5*1000)
        }
      },
  },
  methods: {
    validAmount(amount) {
      if(parseFloat(amount) <= 0)return false
      let re = /^\d+\.?\d*$/;
      return re.test(amount);
    },
    checkForm(){
      this.errors = []

      if (!this.amount || !this.validAmount(this.amount)) {
        this.errors.push(this.$t('msg.fileSend.WrongAmount'));
      }
      if (this.amount && this.validAmount(this.amount) && !this.enough(this.amount)) {
        this.errors.push(this.$t('msg.fileSend.NotEnough'));
      }
      if (!this.errors.length) {
        return true;
      }
    },
    enough(amount){
      let spendable = this.$dbService.getSpendable()
      if(spendable){
        return spendable >= parseFloat(amount) + 0.01 //0.008
      }
      return false
    },
    async send(){
      if(this.checkForm()){
        let fn_output = await window.api.showSaveDialog(this.$t('msg.save'), this.$t('msg.fileSend.saveMsg'), '');

        let tx_data = {
          "src_acct_name": null,
          "amount": parseFloat(this.amount) * 100000000,
          "minimum_confirmations": 10,
          "max_outputs": 500,
          "num_change_outputs": 1,
          "selection_strategy_is_use_all": false,
          "message": "",
          "payment_proof_recipient_address": null,
          "target_slate_version": null,
          "ttl_blocks": null,
          "send_args": null
        }
        let res = await this.$walletService.issueSendTransaction(tx_data);

        if(res && res.result.Ok){
          let result = res.result.Ok;
          if (fn_output.filePath){

            let lock = await this.$walletService.lock_outputs(result);

            if(lock && lock.result.Ok == null){

              fs.writeFileSync(fn_output.filePath, JSON.stringify(result), {
                encoding: "utf8",
                flag: "w"
              });

              log.debug('new send tx file generated')
              this.emitter.emit('update')
              this.closeModal()

            }else if(lock && lock.result.error){
              this.errors.push(lock.result.error.message)
            }else{
              this.errors.push(this.$t('msg.fileSend.CreateFailed'))
            }

          }
        }else if(res && res.result.error){
          this.errors.push(res.result.error.message)
        }else{
          this.errors.push(this.$t('msg.fileSend.CreateFailed'))
        }

      }

    },
    closeModal() {
      this.clearup()
      this.emitter.emit('close', 'windowFileSend');
    },

    clearup(){
      this.errors = []
      this.amount = null
      this.slateVersion = 0
      this.address = ''
    },

  }
}
</script>
<style>
</style>
