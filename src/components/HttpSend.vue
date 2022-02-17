<template>

<div class="modal" :class="{'is-active': showModal}">
  <div class="modal-background" @click="closeModal"></div>
  <div class="modal-card" style="width:480px">
    <header class="modal-card-head">
      <p class="modal-card-title is-size-4 has-text-link has-text-weight-semibold">{{ $t("msg.send") }}(HTTP/HTTPS)</p>
      <button class="delete" aria-label="close" @click="closeModal"></button>
    </header>
    <section class="modal-card-body" style="height:380px;background-color: whitesmoke;">

      <div class="notification is-warning" v-if="errors.length">
        <p v-for="error in errors" :key="error">{{ error }}</p>
      </div>
      <div v-if="!sent">
        <div class="field">
          <label class="label">{{ $t("msg.httpSend.address") }}(HTTP/HTTPS)</label>
          <div class="control">
            <input class="input" type="text" v-model="address" placeholder="eg: https://receiveripaddress:3415">
          </div>
        </div>
        <div class="field">
          <label class="label">{{ $t("msg.httpSend.sendAmount") }}</label>
          <div class="control">
            <input class="input" type="text" v-model="amount" placeholder="1">
          </div>
        </div>

        <br/>
        <div class="field is-grouped">
          <div class="control">
            <button class="button is-link" v-bind:class="{'is-loading':sending}" @click="send">{{ $t("msg.send") }}</button>
          </div>
          <div class="control">
            <button class="button is-text" @click="closeModal">{{ $t("msg.cancel") }}</button>
          </div>
        </div>
      </div>
      <div v-else class="notification is-link" >
        <p>{{ $t("msg.httpSend.success") }}</p>
      </div>
    </section>
  </div>
</div>

</template>
<script>
const log = window.log

export default {
  name: "http-send",
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
      address: '',
      slateVersion: 0,
      sending: false,
      sent: false
    }
  },
  watch: {
      errors:function(newVal){
        if(newVal.length > 0){
          setTimeout(()=>this.errors = [],
          4*1000)
        }
      },
      sent:function(newVal){
       if(newVal){
         setTimeout(()=>this.closeModal(),
          4*1000)
       }
      }
  },
  methods: {
    validAddress(address) {
      let re = new RegExp('^(https?:\\/\\/)'+ // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
        '(\\#[-a-z\\d_]*)?$','i');
      return re.test(address);
    },
    validAmount(amount) {
      if(parseFloat(amount) <= 0)return false
      let re = /^\d+\.?\d*$/;
      return re.test(amount);
    },
    enough(amount){
      let spendable = this.$dbService.getSpendable()
      if(spendable){
        return spendable > parseFloat(amount) + 0.01 //0.008
      }
      return true
    },
    checkForm(){
      this.errors = []
      if (!this.address || !this.validAddress(this.address)) {
        this.errors.push(this.$t('msg.httpSend.WrongAddress'));
      }
      if (!this.amount || !this.validAmount(this.amount)) {
        this.errors.push(this.$t('msg.httpSend.WrongAmount'));
      }
      if (this.validAmount(this.amount) && !this.enough(this.amount)) {
        this.errors.push(this.$t('msg.httpSend.NotEnough'));
      }
      if (!this.errors.length) {
        return true;
      }
    },
    async send(){
      if(this.checkForm() && !this.sending){

        this.sending = true

        let tx_data = {

          "src_acct_name": null,
          "amount": this.amount * 100000000,
          "message": "",
          "minimum_confirmations": 10,
          "max_outputs": 500,
          "num_change_outputs": 1,
          "selection_strategy_is_use_all": false,
          "target_slate_version": null,
          "ttl_blocks": null,
          "payment_proof_recipient_address": null,
          "send_args": {
            "method": "http",
            "dest": this.address,
            "finalize": true,
            "post_tx": true,
            "fluff": false
          }

        }



        let res = await this.$walletService.issueSendTransaction(tx_data)
        if(res && res.data.result){


          if(res.data.result.Ok){
            let tx_id = res.data.result.Ok.id
            log.debug(`issue tx ${tx_id} ok; return:${res.data}`)
            this.sent = true
            this.$dbService.addPostedUnconfirmedTx(tx_id)
            this.sending = false
            this.emitter.emit('update')
          }


        }else{
          if(res && res.data.error){
            this.errors.push(this.$t('msg.httpSend.TxFailed'))
          }
          log.error('http send error:', res)

        }


      }
    },

    closeModal() {
      this.clearup()
      this.emitter.emit('close', 'windowHttpSend');
    },

    clearup(){
      this.errors = []
      this.amount = null
      this.address = '',
      this.sending = false
      this.sent = false
      this.slateVersion = 0
    },

  }
}
</script>
<style>
</style>
