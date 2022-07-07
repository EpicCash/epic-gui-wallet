<template>


    <section class="section is-main-section">
      <div class="columns">
        <div class="column is-half">

          <div>

            <div class="field has-addons">
              <div class="control is-expanded">

                <AddressField @keyup="keyEvent" ref="addressField" />


              </div>
              <div class="control">
                  <router-link class="button has-icon" to="/addressBook">
                    <span class="icon"><mdicon name="plus" /></span>
                  </router-link>

              </div>
            </div>
            <div class="field">
              <div class="control">
                <label class="checkbox">
                  <input type="checkbox" v-model="withproof" @click="addProof">
                  send proof
                </label>
                <div v-show="withproof">
                  <ProofAddressField ref="proofAddressField" />
                </div>
              </div>
            </div>

            <div v-if="foundAddress.length" class="control is-expanded" style="margin-top:-1.5rem">
              <div class="dropdown is-expanded" v-bind:class="{'is-active': foundAddress.length}">
                <div class="dropdown-trigger"></div>
                <div className="dropdown-menu" id="dropdown-menu" role="menu">
                  <div v-for="address in foundAddress" :key="address.id" class="dropdown-content">

                    <a v-if="address.onion" @click="fillAddressField(address, 'onion')"  href="#" class="dropdown-item" data-address-id="{{address.id}}">
                      {{ address.name }} - <span class="paste-address">{{ address.onion }}</span>
                    </a>
                    <a v-if="address.keybase" @click="fillAddressField(address, 'keybase')" href="#" class="dropdown-item" data-address-id="{{address.id}}">
                      {{ address.name }} - <span class="paste-address">{{ address.keybase }}</span>
                    </a>

                  </div>
                </div>
              </div>
            </div>

            <div class="field">
              <div class="control">
                <textarea class="textarea" v-model="message" placeholder="Message (max. 256 chars)" ></textarea>
              </div>
            </div>

            <div class="field">
              <div class="control">
                <AmountField ref="amountField" />
              </div>
            </div>

            <div class="field is-grouped">
              <div class="control">
                <button class="button is-primary" :class="{ 'button__loader': isLoadingSend }" @click="send">
                  <span class="button__text">{{ $t("msg.send") }}</span>
                </button>

              </div>
              <div class="control">
                <button class="button is-primary" :class="{ 'button__loader': isLoadingSendFile }" @click="sendFile">
                  <span class="button__text">Create offline transaction</span>
                </button>
              </div>
            </div>

          </div>


        </div>

      </div>
    </section>


</template>
<script>

const fs = window.nodeFs;
import { ref } from 'vue';
import { useStore } from '@/store';
import AmountField from "@/components/form/amountField";
import ProofAddressField from "@/components/form/proofAddressField";
import AddressField from "@/components/form/addressField";
import useFormValidation from "@/modules/useFormValidation";

export default {
  name: "http-send",
  components: {
    AmountField,
    ProofAddressField,
    AddressField,
  },
  watch: {
      'addressField.input': function (newVal) {
        if(newVal == ''){
          this.addressSelected = false;
          this.withproof = false;
          this.foundAddress = [];
          this.method = 'http';
        }
      },
  },
  setup(){

    const store = useStore();
    const foundAddress = ref([]);
    const addressSelected = ref(false);
    const withproof = ref(false);
    const amountField = ref('');
    const proofAddressField = ref('');
    const addressField = ref('');
    const method = ref('http');
    const message = ref('');
    const isLoadingSend = ref(false);
    const isLoadingSendFile = ref(false);



    const { resetFormErrors } = useFormValidation();

    return {
      store,
      foundAddress,
      addressSelected,
      withproof,
      amountField,
      proofAddressField,
      addressField,
      method,
      message,
      resetFormErrors,
      isLoadingSend,
      isLoadingSendFile
    }

  },
  methods: {

    addProof(){

      if(!this.withproof){
        this.withproof = true;
      }else{
        this.withproof = false;
      }

    },
    fillAddressField(address, type){

      if(!this.addressSelected){
        if(type == 'onion'){
          this.addressField.setValue(address.onion.trim());


        }else if(type == 'keybase'){
          this.addressField.setValue(address.keybase.trim());
          this.method = 'keybase';
        }
        if(address.alwaysproof && address.proofaddr != ''){
          this.withproof = true;
        }
        //always paste proof address even if empty
        this.proofAddressField.setValue(address.proofaddr);
        this.addressSelected = true;
        this.foundAddress = [];
      }
    },

    async keyEvent(value){

      if(!this.addressSelected){

        if(value != ''){
          this.foundAddress = await this.$addressBookService.findAddress(value);
        }
      }
    },


    async sendFile(){

      this.resetFormErrors();
      let isFormAllValid = [];

      isFormAllValid.push(this.amountField.validInput(this.store.state.summary.spendable));
      this.withproof ? isFormAllValid.push(this.proofAddressField.validInput()) : null;


      if(!isFormAllValid.includes(false)){
        this.isLoadingSendFile = true;



        let tx_data = {
          "src_acct_name": null,
          "amount": this.amountField.defaultValue * 100000000,
          "minimum_confirmations": 10,
          "max_outputs": 500,
          "num_change_outputs": 1,
          "selection_strategy_is_use_all": false,
          "message": this.message,
          "payment_proof_recipient_address": this.withproof ? this.proofAddressField.defaultValue : null,
          "target_slate_version": null,
          "ttl_blocks": null,
          "send_args": null
        }

        let res = await this.$walletService.issueSendTransaction(tx_data);

        if(res && res.result.Ok){
          let result = res.result.Ok;

          let fn_output = await window.api.showSaveDialog(this.$t('msg.save'), this.$t('msg.fileSend.saveMsg'), result.id + '.tx');
          if (fn_output.filePath){

            let lock = await this.$walletService.lock_outputs(result);

            if(lock && lock.result.Ok == null){

              fs.writeFileSync(fn_output.filePath, JSON.stringify(result), {
                encoding: "utf8",
                flag: "w"
              });
              this.$toast.success('Transaction file saved');
              this.emitter.emit('app.update');


            }else if(lock && lock.result.error){
              this.$toast.error(lock.result.error.message);
            }else{
              this.$toast.error(this.$t('msg.fileSend.CreateFailed'));

            }

          }else{
            this.$toast.error('Transaction cancelled.');
          }
        }else if(res && res.result.error){
          this.$toast.error(res.result.error.message);
        }else{
          this.$toast.error(this.$t('msg.fileSend.CreateFailed'));
        }

        this.isLoadingSendFile = false;
      }

    },

    async send(){
      this.resetFormErrors();
      let isFormAllValid = [];

      isFormAllValid.push(this.amountField.validInput(this.store.state.summary.spendable));
      this.withproof ? isFormAllValid.push(this.proofAddressField.validInput()) : null;
      isFormAllValid.push(this.addressField.validInput());


      if(!isFormAllValid.includes(false)){
        this.isLoadingSend = true;

        let tx_data = {

          "src_acct_name": null,
          "amount": this.amountField.defaultValue * 100000000,
          "message": this.message,
          "minimum_confirmations": 10,
          "max_outputs": 500,
          "num_change_outputs": 1,
          "selection_strategy_is_use_all": false,
          "target_slate_version": null,
          "ttl_blocks": null,
          "payment_proof_recipient_address": this.withproof ? this.proofAddressField.defaultValue : null,
          "send_args": {
            "method": this.method,
            "dest": this.addressField.defaultValue,
            "finalize": true,
            "post_tx": true,
            "fluff": true
          }

        }

        let res = await this.$walletService.issueSendTransaction(tx_data)
        if(res && res.result && res.result.Ok){

            let tx_id = res.result.Ok.id

            this.store.commit('addPostedUnconfirmedTx', tx_id);
            this.$toast.success(this.$t("msg.httpSend.success"));
            this.emitter.emit('app.update');

        }else{
          console.log(res);

          this.store.commit('updates', {
                "status": "is-danger",
                "text":   res.error.message,
                "icon":   "information"
          });

          this.$toast.error(this.$t('msg.httpSend.TxFailed'));

        }

        this.isLoadingSend = false;
      }

    },

  }
}
</script>
<style>
</style>
