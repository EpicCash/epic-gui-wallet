<template>

  <router-view name="navBar" />
  <router-view name="asideMenu" />
  <router-view name="headerbar" />

  <router-view v-slot="{ Component }">
      <component :is="Component" :key="$route.fullPath" />
  </router-view>
  <aside-right />
</template>

<script>

  import mixin from './mixin.js';
  import { useI18n } from 'vue-i18n/index';
  import { ref, onUnmounted } from 'vue';
  import { useStore } from '@/store';
  import { useRouter } from '@/router';
  import AsideRight from '@/components/layout/AsideRight.vue'

  //app components
  export default {
    name: 'Epic GUI Wallet',
    mixins: [mixin],
    components: {
      AsideRight
    },

    setup() {

      const { locale } = useI18n();
      const loggedIn = ref(false);
      const store = useStore();
      const router = useRouter();

      let startRefreshNodeId = 0;
      let startRefreshNgrokId = 0;
      let refreshId = 0;



      store.commit('darkModeToggle', true);
      router.push('/');

      onUnmounted (_ => {
        clearTimeout(startRefreshNodeId);
        clearTimeout(startRefreshNgrokId);
        clearTimeout(refreshId);
      })

      return {
        locale,
        loggedIn,
        store,
      }
    },


    created() {

      this.emitter.on('app.startRefreshNodeStatus', () => {
        this.stopRefreshNode();
        this.startRefreshNode();
      });

      this.emitter.on('app.stopRefreshNodeStatus', () => {
        this.stopRefreshNode();
      });

      this.emitter.on('app.nodeStart', async () => {
        await this.nodeStart();
      });


      this.emitter.on('app.startRefreshNgrokStatus', () => {
        this.stopRefreshNgrok();
        this.startRefreshNgrok();
      });

      this.emitter.on('app.stopRefreshNgrokStatus', () => {
        this.stopRefreshNgrok();
      });

      this.emitter.on('app.ngrokStart', async () => {
        await this.ngrokStart();
      });

      this.emitter.on('app.selectLocale', (locale) => {
        this.locale = locale;
      })

      this.emitter.on('app.update', () => {
        this.stopRefresh();
        this.startRefresh();
      });

      this.emitter.on('app.logout', () => {
        this.loggedIn = false;
        this.stopRefreshNode();
        this.stopRefresh();
        this.store.dispatch('toggleFullPage', true);
        this.store.commit('asideStateToggle', false);
        this.$router.push('/');

      });

      this.emitter.on('app.accountLoggedIn', async () => {

        this.loggedIn = true;
        this.store.dispatch('toggleFullPage', false);
        this.store.commit('asideStateToggle');
        this.$router.push('/dashboard');
        this.emitter.emit('app.nodeStart');
        this.emitter.emit('app.ngrokStart');





        //always at the very end
        this.emitter.emit('app.update');

      });

      this.emitter.on('killEpicProcess', async (callback) => {
        //todo replace with customized dialog/prompt
        const confirmed = await confirm('We found some running wallet and node processes in the background. Please close them first before you can run this App.');
        callback(confirmed);
      });

    },

    async mounted() {

      //App main window min size
      window.api.resize(1400, 1000);
      //App has started - first close running wallet and node server process
      await this.configService.killEpicProcess();

      if(this.configService.appHasAccounts()){
        //continue to login

        this.$router.push('/login');

      } else {
        //todo init app process here
        console.log('app has no accounts');
        this.$router.push('/new');
      }

    },
    methods: {
      async ngrokStart(){

        if(this.store.state.user.ngrok != ''){
          let ngrokService = await this.$ngrokService.internalStart(this.store.state.user.ngrok);
          if(ngrokService){
            let respNgrok = await this.$ngrokService.openTunnel();
            if(respNgrok){
              this.$toast.success("Ngrok service started");
              this.store.commit('ngrokService', true);
              this.emitter.emit('app.startRefreshNgrokStatus');
            }else{
              this.$toast.error("Error starting Ngrok service");
              this.store.commit('ngrokService', false);
            }
          }else{
            this.$toast.error("Error starting Ngrok service");
            this.store.commit('ngrokService', false);
          }
        }
      },

      async nodeStart(){

        //start internal server only if its setup else just check if external node is running
        if(this.store.state.user.nodeInternal){

          this.store.commit('nodeType', 'internal');
          if(!this.configService.startCheckNode()){
            this.$toast.error("Can not setup internal node server");
          }else{
            let started  = await this.$nodeService.internalNodeStart();
            this.emitter.emit('app.startRefreshNodeStatus');
            if(started){
              this.$toast.success("Node started");
            }else{
              this.$toast.error("Node not started");
            }
          }

        }else{

          this.store.commit('nodeType', this.configService.config['check_node_api_http_addr']);
          let respNode = await this.$nodeService.getNodeStatus(this.store.state.user.nodeInternal);
          if(respNode){
            this.$toast.success("External Node is online");
            this.store.commit('nodeStatus', respNode);
            this.emitter.emit('app.startRefreshNodeStatus');
          }else{
            this.$toast.error("External Node is offline");
          }

        }
      },

      async nodeStatus(){

        let respNode = await this.$nodeService.getNodeStatus(this.store.state.user.nodeInternal);
        if(respNode){
          this.store.commit('nodeStatus', respNode);
        }else{
          if(this.store.state.user.nodeInternal){
            this.$toast.error("Node is offline");
          }else{
            this.$toast.error("External Node is offline");
          }
          this.stopRefreshNode();
        }

      },
      stopRefresh(){
        clearTimeout(this.refreshId);
      },

      /* refresh wallet summary txs and outputs */
      async startRefresh() {

          let refresh = _ => this.refreshId = setTimeout(this.startRefresh, 1000*60)
          try {

            await this.getSummaryinfo();
            await this.getTxs();
            await this.getCommits();

          }
          catch (e) {
            clearTimeout(this.refreshId);
          }
          finally {
            refresh()
          }

      },

      /* refresh node status */
      async startRefreshNode() {


          let refresh = _ => this.startRefreshNodeId = setTimeout(this.startRefreshNode, 1000*30)

          try {
            await this.nodeStatus();

          }
          catch (e) {
            clearTimeout(this.startRefreshNodeId);
          }
          finally {
            refresh()
          }

      },
      stopRefreshNode(){
        clearTimeout(this.startRefreshNodeId);
      },

      /* refresh node status */
      async startRefreshNgrok() {
          let refresh = _ => this.startRefreshNgrokId = setTimeout(this.startRefreshNgrok, 1000*30)

          try {
            await this.$ngrokService.checkStatus();

          }
          catch (e) {
            clearTimeout(this.startRefreshNgrokId);
          }
          finally {
            refresh()
          }

      },
      stopRefreshNgrok(){
        clearTimeout(this.startRefreshNgrokId);
      },

      async getSummaryinfo() {

          let summary = await this.$walletService.getSummaryInfo(10);
          if(summary && summary.result && summary.result.Ok){
            let data = summary.result.Ok

            this.store.commit('summary', {
              spendable: data[1]['amount_currently_spendable']/100000000,
              total: data[1]['total']/100000000,
              unconfirmed: data[1]['amount_awaiting_confirmation']/100000000,
              locked: data[1]['amount_locked']/100000000,
              unfinalization: data[1]['amount_awaiting_finalization']/100000000,
              immature: data[1]['amount_immature']/100000000,
            });
          }else{
            this.store.commit('updates', {
                  "status": "is-danger",
                  "text":   summary.error.message,
                  "icon":   "information"
            });

          }
      },

      async getTxs() {

        let txs = await this.$walletService.getTransactions(true, null, null);

        if(txs && txs.result && txs.result.Ok){
          let data = txs.result.Ok[1].reverse()
          this.store.dispatch('processTxs', {data: data, table: this.$addressTransactionsService})

        }else{
          this.store.commit('updates', {
                "status": "is-danger",
                "text":   txs.error.message,
                "icon":   "information"
          });

        }

      },

      async getCommits() {

          let commits = await this.$walletService.getCommits(false, true, null);

          if(commits && commits.result && commits.result.Ok){
            //this.total_commits =
            let data = commits.result.Ok[1].reverse();
            this.store.dispatch('processCommits', data)

          }else{

            this.store.commit('updates', {
                  "status": "is-danger",
                  "text":   commits.error.message,
                  "icon":   "information"
            });

          }
      },
    }
  }

</script>
