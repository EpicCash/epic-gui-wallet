<template>

      <div class="level">
        <div class="level-left">
          <h2 class="title is-4 level-item">{{ $t("msg.txs.tx") }}</h2>
        </div>

        <div class="level-right">
          <form v-on:submit.prevent="search" class="level-item">
            <div class="field has-addons">
              <p class="control">
                <input class="input is-link is-small" type="text" placeholder="" v-model="keyword" @keyup.enter="search" v-bind:disabled="searched">

              </p>
              <p class="control">
                <button class="button is-link is-small is-outlined" @click="search" v-show="!searched">{{ $t("msg.search") }}</button>
                <button class="button is-link is-small is-outlined" @click="clearup" v-show="searched">{{ $t("msg.clearup") }}</button>
              </p>
            </div>
          </form>
        </div>
      </div>
      <table class="table is-fullwidth is-hoverable">
        <thead>
          <tr class="th">
            <th>#</th>
            <th>Slate ID</th>
            <th>Creation date</th>
            <th>Payment proof</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Status</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>

          <tr v-for="tx in current_txs" :key="tx.id" >
            <td >
              <img v-if="tx.type=='receive'" src="../assets/imgs/arrow-alt-circle-right.svg" style="width:18px;vertical-align:middle;"/>
              <img v-if="tx.type=='send'" src="../assets/imgs/arrow-alt-circle-left.svg" style="width:18px;vertical-align:middle;"/>

            </td>
            <td>{{tx.tx_slate_id}}</td>
            <td>{{ $filters.datetimeFormat(tx.creation_ts) }}</td>
            <td>{{ tx.payment_proof }}</td>
            <td>
                <span v-if="tx.type=='send'">-{{(tx.amount_debited-tx.amount_credited-tx.fee)/100000000}}
                  ({{tx.fee/100000000}})
                </span>
                <span v-else>+{{ tx.amount_credited/100000000 }}</span>
            </td>
            <td>{{ tx.type }}</td>
            <td>
              <span v-if="tx.status=='confirmed'" class="tag is-success is-rounded">{{ $t("msg.confirmed") }}</span>
              <span v-if="tx.status=='unconfirmed'" class="tag is-warning is-rounded">{{ $t("msg.unconfirmed") }}</span>
              <span v-if="tx.status=='cancelled'" class="tag is-warning is-rounded">{{ $t("msg.txs.canceled") }}</span>
            </td>
            <td>
              <button v-if="tx.cancelable" class="button is-small is-link is-outlined" @click="cancel(`${tx.tx_slate_id}`)">
                {{ $t("msg.cancel") }}
              </button>

            </td>


          </tr>

        </tbody>
      </table>


      <div v-if="pages_count>1 && !searched" class="level">
        <div class="level-left">
        </div>
        <div class="level-right">

        <button v-if="current_page_index>1" class="button is-outlined is-link is-small level-item" @click="prev">
          <span class="is-size-7">&lt;</span>
        </button>
        <span class="level-item" style="vertical-align:bottom;">{{current_page_index}}/{{pages_count}}</span>
        <button v-if="current_page_index<pages_count" class="button is-outlined is-link is-small level-item" @click="next">
          <span class="is-size-7">&gt;</span>
        </button>
        &nbsp;&nbsp;
        <input v-model="jump_to" @keyup.enter="jump" class="input is-link is-small level-item" placeholder="2" style="width:30px">
        <button class="button is-link is-small is-outlined level-item">
          <span class="is-size-7" @click="jump">{{ $t("msg.jump") }}</span>
        </button>
        </div>
      </div>

      <p v-if="searched && current_txs.length == 0"> {{ $t("msg.txs.noTxFound") }}</p>
      <p v-if="current_txs.length == 0 && !searched"> {{ $t("msg.txs.noTx") }}</p>

  <message :showMsg="openMsg" v-on:close="openMsg = false"
    v-bind:msg=msg v-bind:showTime="5" msgType="link">
  </message>

</template>

<script>

  const log = window.log;
  import Message from '@/components/Message'
  export default {
    name: 'transaction',
    props:{
      count_per_page: Number,
    },

    components: {
      Message
    },


    data() {
      return {
        current_txs: [],
        total_txs: [],
        current_page_index: 1,
        pages_count: 1,
        jump_to: 2,
        keyword: "",
        searched: false,
        openMsg: false,
        msg: this.$t("msg.txs.cancelSuccess")
      }
    },
    mounted () {
      this.getTxs()
    },
    created () {
      this.emitter.on('update', ()=>this.getTxs())
    },
    methods: {

      getTxs() {
        this.$walletService.getTransactions(true, null, null)
          .then((res) => {
            let data = res.result.Ok[1].reverse()

            this.total_txs = this.processTxs(data)
            this.current_txs = this.total_txs.slice(0, this.count_per_page)
            if (this.total_txs.length % this.count_per_page == 0){
              this.pages_count = parseInt(this.total_txs.length/this.count_per_page)
            }else{
              this.pages_count = parseInt(this.total_txs.length/this.count_per_page) + 1
            }
          }
          ).catch((error) => {
            log.error('getTxs error:' + error)
          })
      },
      processTxs(txs) {
        let posted = this.$dbService.getPostedUnconfirmedTxs()
        log.debug('Posted txs in processTxs: ' + posted.size)

        let txs_processed = txs.map(function(x){
          x.status = 'unconfirmed'
          if( x.confirmed){
            x.status = 'confirmed'
          }
          if( x.tx_type.search('Cancelled') != -1){
            x.status = 'cancelled'
          }
          if(x.status === 'unconfirmed'){
            x.cancelable = true
          }
          if(x.status === 'unconfirmed'&&posted.size>0){
            if(posted.has(x.tx_slate_id)){
              log.debug(`${x.tx_slate_id} posted so uncanceled`)
              x.cancelable = false
            }
          }
          if(x.status!='unconfirmed'&&posted.size>0){
            if(posted.has(x.tx_slate_id)){
              posted.delete(x.tx_slate_id)
            }
          }
          if (x.tx_type.search('Coinbase')!=-1){
            x.type = 'coinbase'
          }else if(x.tx_type.search('Received')!=-1){
            x.type = 'receive'
          }else{
            x.type = 'send'
          }
          return x
        })
        this.$dbService.setPostedUnconfirmedTxs(posted)
        return txs_processed
      },
      next(){
        this.current_page_index += 1
        let s = (this.current_page_index-1)*this.count_per_page
        this.current_txs = this.total_txs.slice(s, s+this.count_per_page)
      },
      prev(){
        this.current_page_index -= 1
        let s = (this.current_page_index-1)*this.count_per_page
        this.current_txs = this.total_txs.slice(s, s+this.count_per_page)
      },
      jump(){
        this.jump_to = parseInt(this.jump_to)

        if(isNaN(this.jump_to)) {
          this.jump_to = this.current_page_index
          return
        }

        if(this.jump_to > this.pages_count) this.jump_to = this.pages_count
        if(this.jump_to < 1) this.jump_to = 1
        this.current_page_index = this.jump_to
        let s = (this.current_page_index-1)*this.count_per_page
        this.current_txs = this.total_txs.slice(s, s+this.count_per_page)
      },

      search(){
        let keyword = this.keyword
        if(this.keyword){
          this.current_txs = this.total_txs.filter(function(tx){
            if(tx.tx_slate_id&&tx.tx_slate_id.search(keyword) != -1){
              return tx
            }})
          this.searched = true
        }
      },

      clearup(){
        this.keyword = ""
        this.searched = false
        let s = (this.current_page_index-1)*this.count_per_page
        this.current_txs = this.total_txs.slice(s, s+this.count_per_page)
      },

      async cancel(tx_slate_id){
        let res = await this.$walletService.cancelTransactions(null, tx_slate_id);
        if(res && res.result.Ok == null){
          this.emitter.emit('update')
          this.openMsg = true
        }else if(res && res.result.error){
          log.error(`res.result.error:${res.result.error};`)
        }
      },
    }
  }
</script>
<style>
</style>
