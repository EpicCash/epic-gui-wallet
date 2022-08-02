<template>

  <div class="card has-table has-mobile-sort-spaced">
    <header class="card-header">
      <p class="card-header-title">
        <mdicon name="monitor-cellphone" size="18" />&nbsp;{{ $t("msg.txs.tx") }}
      </p>
      <button :disabled="isRefresh" type="button" class="button is-small" @click="this.getTxs()"><span class="icon"><mdicon name="refresh" /></span><span>{{ $t("msg.refresh") }}</span></button>
    </header>
    <div class="notification is-card-toolbar is-upper">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <div class="buttons has-addons">
              <button v-bind:class="{'is-active': currentFilter == 'received'}" @click="filter('received', 0, true)" class="button">{{ $t("msg.transaction.received") }}</button>
              <button v-bind:class="{'is-active': currentFilter == 'send'}" @click="filter('send', 0, true)" class="button">{{ $t("msg.transaction.send") }}</button>
            </div>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <form v-on:submit.prevent="search" >
              <div class="field has-addons">
                <div class="control">

                  <input class="input" type="text" :placeholder="$t('msg.placeholder_search')" v-model="keyword" @keyup.enter="search" v-bind:disabled="searched">
                </div>
                <div class="control">

                  <button v-show="!searched" class="button is-primary"><span class="icon"><mdicon name="dots-horizontal" /></span></button>
                  <button @click.prevent="clearup" v-show="searched" class="button is-primary"><span class="icon"><mdicon name="close-circle-outline" /></span></button>


                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="card-content">


      <div class="b-table has-pagination">
        <div class="table-wrapper has-mobile-cards">

          <table class="table is-fullwidth is-striped is-hoverable">
            <thead>
              <tr class="th">
                <th>#</th>
                <th>{{ $t("msg.transaction.transaction_id") }}</th>
                <th style="min-width:180px;">{{ $t("msg.transaction.creation_date") }}</th>
                <th>{{ $t("msg.transaction.receiver") }}</th>
                <th>{{ $t("msg.transaction.payment_proof") }}</th>
                <th>{{ $t("msg.transaction.amount") }}</th>
                <th>{{ $t("msg.transaction.status") }}</th>
                <th>{{ $t("msg.transaction.transfer_type") }}</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody v-if="current_txs.length">
              <template v-for="tx in current_txs" :key="tx.id"  >
              <tr>
                <td >

                  <mdicon size="18" v-if="tx.tx_type=='TxSent'" name="arrow-left-circle-outline" class="has-text-danger" />
                  <mdicon size="18" v-if="tx.tx_type=='TxReceived'" name="arrow-right-circle-outline" class="has-text-success" />
                  <mdicon size="18" v-if="tx.tx_type!='TxSent' && tx.tx_type!='TxReceived'" name="cancel" class="has-text-warning" />


                </td>
                <td><span :title="tx.tx_slate_id ? tx.tx_slate_id: ''">{{ $filters.truncateMid(tx.tx_slate_id ? tx.tx_slate_id: '', 19) }}</span></td>
                <td>{{ $filters.datetimeFormat(tx.creation_ts, locale) }}</td>
                <td><span v-bind:class="{'is-hidden': store.state.hideValues }">{{ tx.address ? tx.address.name : null }}</span></td>
                <td>{{ $filters.truncateMid($filters.paymentProof(tx.payment_proof, 'receiver_address'), 19) }}</td>
                <td>


                    <span v-bind:class="{'amount-hidden': store.state.hideValues }" v-if="tx.tx_type=='TxSent' || tx.tx_type=='TxSentCancelled'">-{{(tx.amount_debited-tx.amount_credited-tx.fee)/100000000}}
                      ({{tx.fee/100000000}})
                    </span>
                    <span v-bind:class="{'amount-hidden': store.state.hideValues }" v-else>+{{ tx.amount_credited/100000000 }}</span>
                </td>
                <td>
                  <span v-if="tx.status=='confirmed'" class="tag is-success is-normal">{{ $t("msg.confirmed") }}</span>
                  <span v-if="tx.status=='unconfirmed'" class="tag is-warning is-normal">{{ $t("msg.unconfirmed") }}</span>
                  <span v-if="tx.status=='cancelled'" class="tag is-warning is-normal">{{ $t("msg.txs.canceled") }}</span>
                </td>
                <td>{{ tx.address ? tx.address.type : null }}</td>

                <td class="is-actions-cell">

                  <div class="buttons is-right">
                    <router-link v-if="tx.address && tx.address.type == 'file' && tx.status=='unconfirmed'" class="button is-small is-primary" to="/finalizeTransaction">
                      <span title="Finalize" class="is-icon"><mdicon name="basket" size="12" /></span>
                    </router-link>
                    <button v-if="tx.cancelable" class="button is-small is-primary" :class="{ 'button__loader': isLoading }" @click="cancel(`${tx.tx_slate_id}`)">
                      <span title="Cancel" class="is-icon"><span class="button__text"><mdicon name="cancel" size="12" /></span></span>
                    </button>

                    <button class="button is-small is-primary" @click="detail(tx)">
                      <span title="Details" class="is-icon">
                        <mdicon v-if="tx.id !== txDetail" name="eye" size="12" />
                        <mdicon v-else name="eye-off" size="12" />
                      </span>
                    </button>





                  </div>
                </td>


              </tr>
              <tr v-bind:class="{'is-hidden': tx.id != txDetail}" >
                <td></td>
                <td colspan="8">
                  <table>
                    <tr>
                      <td class="tx-details">
                        <span class="has-text-weight-bold">{{ $t("msg.transaction.id") }}:</span> {{tx.id}}<br/>
                        <span class="has-text-weight-bold">{{ $t("msg.transaction.slate_id") }}:</span> {{tx.tx_slate_id}}<br/>
                        <span class="has-text-weight-bold">{{ $t("msg.transaction.creation_date") }}:</span> {{$filters.datetimeFormat(tx.creation_ts, locale)}}<br/>
                        <span class="has-text-weight-bold">{{ $t("msg.transaction.confirmation_date") }}:</span> {{$filters.datetimeFormat(tx.confirmation_ts, locale)}}<br/>
                        <span class="has-text-weight-bold">{{ $t("msg.transaction.amount_credited") }}:</span> <span v-bind:class="{'amount-hidden': store.state.hideValues }" >{{tx.amount_credited/100000000}}</span><br/>
                        <span class="has-text-weight-bold">{{ $t("msg.transaction.amount_debited") }}:</span> <span v-bind:class="{'amount-hidden': store.state.hideValues }" >{{tx.amount_debited/100000000}}</span><br/>
                        <span class="has-text-weight-bold">{{ $t("msg.transaction.fee") }}:</span> {{tx.fee/100000000}}<br/>
                        <template v-if="tx.messages && tx.messages.messages">
                          <p  v-for="message in tx.messages.messages" :key="message.id" >
                            <span class="has-text-weight-bold">{{ $t("msg.transaction.message") }} {{message.id}}:</span> {{message.message}}<br/>
                          </p>
                        </template>
                      </td>
                      <td>
                        <span class="has-text-weight-bold">{{ $t("msg.transaction.status") }}:</span> {{tx.status}}<br/>
                        <span class="has-text-weight-bold">{{ $t("msg.transaction.type") }}:</span> {{tx.tx_type}}<br/>


                          <template v-if="tx.payment_proof">
                              <span v-if="tx.payment_proof" class="has-text-weight-bold">{{ $t("msg.transaction.payment_proof") }}:</span><br/>
                              &nbsp;&nbsp;&nbsp;<span class="has-text-weight-bold">{{ $t("msg.transaction.receiver_address") }}:</span> <span :title="tx.payment_proof.receiver_address">{{ $filters.truncateMid(tx.payment_proof.receiver_address ? tx.payment_proof.receiver_address: '', 30) }}&nbsp;<mdicon @click="copy(tx.payment_proof.receiver_address)" name="content-copy" size=16 /></span><br/>
                              &nbsp;&nbsp;&nbsp;<span class="has-text-weight-bold">{{ $t("msg.transaction.receiver_signature") }}:</span> <span :title="tx.payment_proof.receiver_signature">{{ $filters.truncateMid(tx.payment_proof.receiver_signature ? tx.payment_proof.receiver_signature: '', 30) }}&nbsp;<mdicon @click="copy(tx.payment_proof.receiver_signature)" name="content-copy" size=16 /></span><br/>
                              &nbsp;&nbsp;&nbsp;<span class="has-text-weight-bold">{{ $t("msg.transaction.sender_address") }}:</span> <span :title="tx.payment_proof.sender_address">{{ $filters.truncateMid(tx.payment_proof.sender_address ? tx.payment_proof.sender_address: '', 30) }}&nbsp;<mdicon @click="copy(tx.payment_proof.sender_address)" name="content-copy" size=16 /></span><br/>
                              &nbsp;&nbsp;&nbsp;<span class="has-text-weight-bold">{{ $t("msg.transaction.sender_signature") }}:</span> <span :title="tx.payment_proof.sender_signature">{{ $filters.truncateMid(tx.payment_proof.sender_signature ? tx.payment_proof.sender_signature: '', 30) }}&nbsp;<mdicon @click="copy(tx.payment_proof.sender_signature)" name="content-copy" size=16 /></span><br/>
                              &nbsp;&nbsp;&nbsp;<span class="has-text-weight-bold">{{ $t("msg.transaction.sender_address_path") }}:</span> {{tx.payment_proof.sender_address_path}}<br/>

                          </template>

                          <template v-else>
                            <span class="has-text-weight-bold">{{ $t("msg.transaction.payment_proof") }}: </span>-<br/>
                          </template>

                      </td>
                   </tr>
                  </table>
                </td>
              </tr>
              </template>


            </tbody>
            <tbody v-else >
            <tr class="is-empty" >
              <td colspan="9">
                <section class="section">
                  <div class="content has-text-grey has-text-centered">
                    <p>
                      <span class="icon is-large"><mdicon name="circle-off-outline" size="48" /></span>
                    </p>

                  </div>
                </section>
              </td>
            </tr>
            </tbody>
          </table>


        </div>
        <div class="top level">
          <div class="level-left">
            <div class="level-item">
              <div class="buttons has-addons">

                <button :disabled="current_page_index <= 1" class="button" @click="prev">&lt;</button>

                <template v-for="index in pages_count" :key="index">

                  <button v-if="index <= Math.round(maxButtons/2) || index > (pages_count-Math.round(maxButtons/2)) " @click="page(index)" v-bind:class="{'is-active': current_page_index == index}" class="button" >
                    {{ index }}
                  </button>
                  <button v-else-if="index == Math.round(pages_count/2)" v-bind:class="{'is-active': current_page_index > Math.round(maxButtons/2) && current_page_index <= (pages_count-Math.round(maxButtons/2))}" class="button" >
                  <span class="pager-activepage" v-if="current_page_index > Math.round(maxButtons/2) && current_page_index <= (pages_count-Math.round(maxButtons/2))">{{current_page_index}}</span>...
                  </button>

                </template>

                <button :disabled="current_page_index >= pages_count" class="button" @click="next">&gt;</button>

              </div>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <small>{{ $t("msg.page_of", [current_page_index, pages_count]) }}</small>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<script>

  import { ref, computed, onUnmounted } from 'vue';
  import { useStore } from '@/store'



  export default {
    name: 'transaction',
    setup(){


      const store = useStore();
      const maxButtons = ref(6);
      const currentFilter = ref('');
      const pages_count = ref(1);
      const current_page_index = ref(1);
      const current_txs = ref([]);
      const count_per_page = ref(10);

      const total_txs = computed(() => store.state.txs)


      const keyword =  ref("");
      const searched = ref(false);

      const detailToggle = ref(false);
      const txDetail = ref(-1);
      const isRefresh = ref(false);
      const locale = ref('en');
      const isLoading = ref(false);

      return{
        store,
        maxButtons,
        currentFilter,
        pages_count,
        current_page_index,
        current_txs,
        total_txs,
        keyword,
        searched,
        detailToggle,
        txDetail,
        isRefresh,
        count_per_page,
        locale,
        isLoading
      }
    },
    watch: {
        total_txs: function (newVal) {
          if(newVal){

            if (newVal.length % this.count_per_page == 0){
              this.pages_count = parseInt(newVal.length/this.count_per_page)
            }else{
              this.pages_count = parseInt(newVal.length/this.count_per_page) + 1
            }

            let s = (this.current_page_index-1)*this.count_per_page
            this.current_txs = this.currentFilter == '' ? this.total_txs.slice(s, s+this.count_per_page) : this.filter(this.currentFilter, s, false)

          }
        },
    },

    mounted() {

      this.current_txs = this.total_txs.slice(0, this.count_per_page);

      if (this.total_txs.length % this.count_per_page == 0){
        this.pages_count = parseInt(this.total_txs.length/this.count_per_page)
      }else{
        this.pages_count = parseInt(this.total_txs.length/this.count_per_page) + 1
      }

    },
    async created(){
      this.locale = await window.api.locale();
    },
    methods: {
      copy(text){
        window.clipboard.writeText(text);
        this.$toast.show(this.$t('msg.copy_to_clipboard'), {duration:1000});

      },
      detail(tx){

        if(tx.id !== this.txDetail){
          this.detailToggle = false;
        }

        this.detailToggle = this.detailToggle !== true;
        this.txDetail = this.detailToggle ? tx.id : -1;

      },
      async getTxs() {

        this.isRefresh = true;
        let txs = await this.$walletService.getTransactions(true, null, null);
        this.isRefresh = false;

        if(txs && txs.result && txs.result.Ok){
          let data = txs.result.Ok[1].reverse()

          this.store.dispatch('processTxs', {data: data, table:this.$addressTransactionsService})

          if(this.currentFilter == ''){
            this.current_txs = this.total_txs.slice(0, this.count_per_page)
            if (this.total_txs.length % this.count_per_page == 0){
              this.pages_count = parseInt(this.total_txs.length/this.count_per_page)
            }else{
              this.pages_count = parseInt(this.total_txs.length/this.count_per_page) + 1
            }
          }else{
              this.current_txs = this.filter(this.currentFilter, 0, false);
          }

        }else{

          this.$toast.error(txs.error);
        }
      },

      next(){
        this.current_page_index += 1
        let s = (this.current_page_index-1)*this.count_per_page
        this.current_txs = this.currentFilter == '' ? this.total_txs.slice(s, s+this.count_per_page) : this.filter(this.currentFilter, s, false)
      },
      prev(){
        this.current_page_index -= 1
        let s = (this.current_page_index-1)*this.count_per_page
        this.current_txs = this.currentFilter == '' ? this.total_txs.slice(s, s+this.count_per_page) : this.filter(this.currentFilter, s, false)
      },
      page(index){
        this.current_page_index = index
        let s = (this.current_page_index-1)*this.count_per_page
        this.current_txs = this.currentFilter == '' ? this.total_txs.slice(s, s+this.count_per_page) : this.filter(this.currentFilter, s, false)
      },

      filter(type, isSlice, toggleFilter){

        if(type == this.currentFilter && toggleFilter){
          type = '';
        }

        if(isSlice == 0){
          this.current_page_index = 1;
        }

        let filterTx = [];
        this.currentFilter = type;

        if(type == 'received'){
          for(let tx of this.total_txs){
            if(tx.tx_type == 'TxReceived' || tx.tx_type == 'TxReceivedCancelled'){
              filterTx.push(tx);
            }
          }
        }else if(type == 'send'){
          for(let tx of this.total_txs){
            if(tx.tx_type == 'TxSent' || tx.tx_type == 'TxSentCancelled'){
              filterTx.push(tx);
            }
          }
        }else{
          filterTx = this.total_txs
        }


        this.current_txs = filterTx.slice(isSlice, isSlice+this.count_per_page);
        if (filterTx.length % this.count_per_page == 0){
          this.pages_count = parseInt(filterTx.length/this.count_per_page)
        }else{
          this.pages_count = parseInt(filterTx.length/this.count_per_page) + 1
        }
        return this.current_txs;

      },

      search(){
        let keyword = this.keyword
        if(this.keyword){
          if(this.currentFilter != ''){
            let filtered_txs = this.filter(this.currentFilter, 0, false);
            this.current_txs = filtered_txs.filter(function(tx){
              if(tx.tx_slate_id&&tx.tx_slate_id.search(keyword) != -1){
                return tx
              }
            });
          }else{
            this.current_txs = this.total_txs.filter(function(tx){
              if(tx.tx_slate_id&&tx.tx_slate_id.search(keyword) != -1){
                return tx
              }
            });
          }

          this.searched = true

        }
      },

      clearup(){

        this.keyword = ""
        this.searched = false

        let s = (this.current_page_index-1)*this.count_per_page
        this.current_txs = this.currentFilter == '' ? this.total_txs.slice(s, s+this.count_per_page) : this.filter(this.currentFilter, s, false);
      },

      async cancel(tx_slate_id){
        this.isLoading = true;
        let res = await this.$walletService.cancelTransactions(null, tx_slate_id);
        this.isLoading = false;
        if(res && res.result && res.result.Ok == null){

          this.$toast.success(this.$t("msg.txs.cancelSuccess"));
          this.emitter.emit('app.update');
        }else if(res && res.error){
          this.$toast.error(res.error.message);

        }
      },
    }
  }
</script>
