<template>

  <section class="section is-main-section">

    <summary-info></summary-info>

    <div id="tabs-with-content">

      <div class="tabs is-toggle is-toggle-rounded">
        <ul>
          <li v-bind:class="{'is-active':transactionTab}">
            <a @click="openTab('transactionTab')" >{{ $t('msg.dashboard.transactions') }}</a>
          </li>
          <li v-bind:class="{'is-active':commitTab}">
            <a @click="openTab('commitTab')" >{{ $t('msg.dashboard.coins') }}</a>
          </li>
        </ul>
      </div>

      <div>
        <section v-bind:class="{'is-active':transactionTab}" class="tab-content">
          <transaction></transaction>
        </section>
        <section v-bind:class="{'is-active':commitTab}" class="tab-content">
          <commit></commit>
        </section>
      </div>

    </div><!-- tabs-with-content -->

  </section>

</template>


<script>


import { ref } from 'vue';
import { useStore } from '@/store';
import Transaction from '@/components/Transaction.vue'
import Commit from '@/components/Commit.vue'
import SummaryInfo from '@/components/SummaryInfo.vue'

export default {
  name: "dashboard",
  components: {
    Transaction,
    Commit,
    SummaryInfo,
  },

  setup() {


    const store = useStore();
    const transactionTab = ref(true);
    const commitTab = ref(false);


    return {
      store,
      transactionTab,
      commitTab,

    }

  },

  methods:{

    openTab(tabName) {
        if(tabName == 'transactionTab'){
          this.transactionTab = true;
          this.commitTab = false;
        }else{
          this.transactionTab = false;
          this.commitTab = true;
        }
    },




  }
}

</script>
