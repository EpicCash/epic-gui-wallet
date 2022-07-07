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

    /*emits: {
      logout() {
        console.log('emits logout');
        // return `true` or `false` to indicate
        // validation pass / fail
        return true;
      }
    },*/

    setup() {

      const { locale } = useI18n();
      const loggedIn = ref(false);
      const store = useStore();
      const router = useRouter();
      const pollingStopped = ref(false);
      let pollingId = 0;



      store.commit('darkModeToggle', true);
      router.push('/');

      onUnmounted (_ => clearTimeout(pollingId))

      return {
        locale,
        loggedIn,
        store,
      }
    },


    created() {

      this.emitter.on('app.startRefreshNodeStatus', () => {
        this.pollingStopped = false;
        this.startPolling();
      });

      this.emitter.on('app.stopRefreshNodeStatus', () => {
        this.stopPolling();
      });

      this.emitter.on('app.nodeStart', async () => {
        this.stopPolling();
        await this.nodeStart();
        this.startPolling();
      })

      this.emitter.on('app.selectLocale', (locale) => {
        this.locale = locale;
      })

      this.emitter.on('app.update', async () => {
        await this.getSummaryinfo();
        await this.getTxs();
        await this.getCommits();
      });

      this.emitter.on('app.logout',() => {
        this.loggedIn = false;
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

        if(this.store.state.user.ngrok != ''){
          let ngrokService = await this.$ngrokService.internalStart(this.store.state.user.ngrok);
          if(ngrokService){
            let respNgrok = await this.$ngrokService.openTunnel();
            let ngrokStatus = await this.$ngrokService.checkStatus();
            if(ngrokStatus){
              this.$toast.success("Ngrok service started");
              this.store.commit('ngrokService', true);
            }else{
              this.$toast.error("Error starting Ngrok service");
              this.store.commit('ngrokService', false);
            }
          }
        }


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

      async nodeStart(){
        //start internal server only if its setup else just check if external node is running
        if(this.store.state.user.nodeInternal){

          this.store.commit('nodeType', 'internal');
          if(!this.configService.startCheckNode()){
            this.$toast.error("Can not setup internal node server");
          }else{
            await this.$nodeService.internalNodeStart();
            let respNode = await this.$nodeService.getNodeStatus();

            if(respNode){
              this.$toast.success("Node is online");
              this.store.commit('nodeStatus', respNode);
              this.emitter.emit('app.startRefreshNodeStatus');
            }else{
              this.$toast.error("Node is offline");

            }
          }

        }else{
          this.store.commit('nodeType', this.configService.config['check_node_api_http_addr']);
          let respNode = await this.$nodeService.getNodeStatus();
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

        if(this.store.state.user.nodeInternal){
            let respNode = await this.$nodeService.getNodeStatus();
            console.log(respNode);
            if(respNode){
              this.store.commit('nodeStatus', respNode);
            }else{
              this.$toast.error("Node is offline");
              this.stopPolling();
            }

        }else{

          let respNode = await this.$nodeService.getNodeStatus();
          if(respNode){
            this.store.commit('nodeStatus', respNode);
          }else{
            this.$toast.error("External Node is offline");
            this.stopPolling();
          }
        }


      },
      stopPolling(){
        this.pollingStopped = true;
        clearTimeout(this.pollingId);
      },

      async startPolling() {

        if(!this.pollingStopped){
          let polling = _ => this.pollingId = setTimeout(this.startPolling, 1000*30)

          try {
            await this.nodeStatus();

          }
          catch (e) {
            console.error ('Error startPolling', e)
            clearTimeout(this.pollingId);
          }
          finally {
            polling()
          }
        }
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
          this.store.dispatch('processTxs', data)

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
