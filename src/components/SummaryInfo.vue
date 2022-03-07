<template>
  <div id="balances" class="box" >
   <div id="balances-content">
    <p class="subtitle is-5">{{ $t("msg.info.total") }}:</p>
    <p class="title" v-bind:class="{'is-2':!smallTitle, 'is-4':smallTitle}">{{total}} EPIC</p>
    <p>{{ $t("msg.info.spendable") }}: {{spendable}}</p>
    <p>{{ $t("msg.unconfirmed") }}: {{unconfirmed}}</p>
    <p>{{ $t("msg.info.unfinalization") }}: {{unfinalization}}</p>
    <p v-if="immature>0">{{ $t("msg.info.immature") }}: {{immature}}</p>
    <p>{{ $t("msg.locked") }}: {{locked}}</p>
	<div style="clear:both"></div>
   </div>
  </div>
</template>

<script>
  const log = window.log;

  export default {
    name: 'summary-info',

    data(){
      return {
        spendable: 0,
        total: 0,
        unconfirmed: 0,
        unfinalization: 0,
        immature: 0,
        locked: 0,
        smallTitle: true
      }
    },

    mounted () {
      this.getSummaryinfo()
    },


    created () {

      this.emitter.on("update", () => {
      console.log("this.emitter on update");
        this.getSummaryinfo();
      });
    },
     methods: {
        getSummaryinfo: async function() {

        let info = await this.$walletService.getSummaryInfo(10);
        if(info && info.result){
          let data = info.result.Ok
          this.spendable = data[1]['amount_currently_spendable']/100000000
          this.total = data[1]['total']/100000000
          this.unconfirmed = data[1]['amount_awaiting_confirmation']/100000000
          this.locked = data[1]['amount_locked']/100000000
          this.unfinalization = data[1]['amount_awaiting_finalization']/100000000
          this.immature = data[1]['amount_immature']/100000000
          this.$dbService.setSpendable(this.spendable)

          if(this.spendable.toString().length > 6)this.smallTitle=true
        }else if(info && info.error){
          console.log('error getSummaryinfo', info.error);
        }else{
          console.log('error getSummaryinfo', info);
        }

      }
    }
  }
</script>

<style>
  #balances {
    min-height: 210px;
    padding: 0;
    z-index: 1;

  }

  #balances-content {
    padding: 10px;
  }
</style>
