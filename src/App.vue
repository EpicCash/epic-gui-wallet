<template>

  <router-view name="navBar" />
  <router-view name="asideMenu" />
  <router-view name="headerbar" />

  <router-view v-slot="{ Component }">
      <component :is="Component" :key="$route.fullPath" />
  </router-view>
  <aside-right />

  <modal-node-box
    :is-active="isNodeModalActive"
    @confirm="nodesyncedConfirm"
    @cancel="nodesyncedCancel"

  />

  <modal-firstsync-box
    :is-active="isFirstscanModalActive"
    @confirm="firstscanConfirm"
    @cancel="firstscanCancel"
    :output-data="scanoutput"
  />

</template>

<script>

  import mixin from './mixin.js';
  import { useI18n } from 'vue-i18n/index';
  import { ref, onUnmounted } from 'vue';
  import { useStore } from '@/store';
  import { useRouter } from '@/router';
  import AsideRight from '@/components/layout/AsideRight.vue'
  import ModalNodeBox from '@/components/layout/NodesyncedModalBox.vue'
  import ModalFirstsyncBox from '@/components/layout/FirstsyncModalBox.vue'

  //app components
  export default {
    name: 'Epic GUI Wallet',
    mixins: [mixin],
    components: {
      AsideRight,
      ModalNodeBox,
      ModalFirstsyncBox
    },

    setup() {

      const { locale } = useI18n();
      const loggedIn = ref(false);
      const store = useStore();
      const router = useRouter();
      const isNodeModalActive = ref(false);
      const isFirstscanModalActive = ref(false);
      const scanoutput = ref([]);


      let startRefreshNodeId = 0;
      let startRefreshNgrokId = 0;
      let refreshId = 0;

      store.commit('darkModeToggle', true);
      router.push('/');

      /* is this called ever ? */
      onUnmounted (_ => {

        clearTimeout(startRefreshNodeId);
        clearTimeout(startRefreshNgrokId);
        clearTimeout(refreshId);
      })

      return {
        locale,
        loggedIn,
        store,
        isNodeModalActive,
        isFirstscanModalActive,
        scanoutput
      }
    },


    created() {

      window.nodeChildProcess.on('firstscan-stdout', (payload) => {

        let lines = payload.data.split("\n");

        for(var i = 0;i<lines.length;i++){
          let cleanString = lines[i].replace(/^.+(?:WARN\s|DEBUG\s)/gm, '');
          if(cleanString !== lines[i]){
            if(cleanString.includes('This wallet has not been scanned against the current chain')){
              this.isFirstscanModalActive = true;
            }

            this.scanoutput.unshift("\n"+cleanString);
          }
        }

      });

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

      this.emitter.on('app.ngrokStop', async () => {
         await this.ngrokStop();
      });



      this.emitter.on('app.selectLocale', (locale) => {
        this.locale = locale;
      })

      this.emitter.on('app.update', () => {
        this.stopRefresh();
        this.startRefresh();
      });

      this.emitter.on('app.logout', async () => {

        this.stopRefreshNode();
        this.stopRefreshNgrok();
        this.stopRefresh();
        this.store.commit('user', {});
        this.store.commit('txs', []);
        this.store.commit('commits', []);
        this.store.commit('summary', {
          spendable: 0,
          total: 0,
          unconfirmed: 0,
          unfinalization: 0,
          immature: 0,
          locked: 0,
        });



        await this.$walletService.stopListen();
        await this.$walletService.stopWallet();
        await this.$ngrokService.stopNgrok();
        await this.$nodeService.stopNode();
        this.$walletService.logoutClient();
        this.loggedIn = false;
        this.configService.resetConfig();

        this.store.dispatch('toggleFullPage', true);
        this.store.commit('asideStateToggle', false);
        this.$router.push('/login');

      });

      this.emitter.on('app.accountLoggedIn', async () => {

        window.debug ? console.log('accountLoggedIn') : null;

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
        let msg = this.$t("msg.app.background_process");
        const confirmed = await confirm(msg);
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

        window.debug ? console.log('app has no accounts') : null;
        this.$router.push('/new');
      }

    },
    methods: {
      nodesyncedModalOpen(){
        this.isNodeModalActive = true
      },

      nodesyncedConfirm(){
        this.isNodeModalActive = false
        this.emitter.emit('app.logout');
      },

      nodesyncedCancel(){
        this.isNodeModalActive = false
      },

      firstscanConfirm(){
        this.isFirstscanModalActive = false
      },
      firstscanCancel(){
        this.isFirstscanModalActive = false
      },

      async ngrokStop(){
        this.stopRefreshNgrok();
        let respNgrok = await this.$ngrokService.stopNgrok();
        if(respNgrok){
          this.$toast.success(this.$t("msg.app.ngrok_service_stopped"));
          this.store.commit('ngrokService', false);
          this.store.commit('ngrokTunnels', {});
        }
      },

      async ngrokStart(){

        if(this.store.state.user.ngrok != '' || this.store.state.user.ngrok_force_start){

          let ngrokService = await this.$ngrokService.internalStart(this.store.state.user.ngrok == '' ? '' : this.store.state.user.ngrok);


          if(ngrokService.success){
            let respNgrok = await this.$ngrokService.openTunnel();
            if(respNgrok){
              this.$toast.success(this.$t("msg.app.ngrok_service_started"));
              this.store.commit('ngrokService', true);
              this.store.commit('ngrokTunnels', respNgrok);
              this.emitter.emit('app.startRefreshNgrokStatus');
            }else{
              this.$toast.error(this.$t("msg.app.ngrok_service_error"));
              this.store.commit('ngrokService', false);
              this.store.commit('ngrokTunnels', {});
            }
          }else{
            this.$toast.error(this.$t("msg.app.ngrok_service_error"));
            this.store.commit('updates', {
                  "status": "is-danger",
                  "text":   "Ngrok: " + ngrokService.msg,
                  "icon":   "information"
            });
            this.store.commit('ngrokService', false);
            this.store.commit('ngrokTunnels', {});
          }
        }

      },

      async nodeStart(){

        //start internal server only if its setup else just check if external node is running
        if(this.store.state.user.nodeInternal){

          this.store.commit('nodeType', 'internal');
          if(!this.configService.startCheckNode()){
            this.$toast.error(this.$t("msg.app.error_setup_internal_node"));
          }else{
            let started  = await this.$nodeService.internalNodeStart();

            if(started){
              this.$toast.success(this.$t("msg.app.node_started"));
              //start the status check for the node
              //give the node some time before api status is called
              setTimeout(this.startRefreshNode, 10000);
            }else{
              this.$toast.error(this.$t("msg.app.node_not_started"));
            }
          }

        }else{

          this.store.commit('nodeType', this.configService.config['check_node_api_http_addr']);
          let respNode = await this.$nodeService.getNodeStatus(this.store.state.user.nodeInternal);
          if(respNode){
            this.$toast.success(this.$t("msg.app.external_node_online"));
            this.store.commit('nodeStatus', respNode);
            //start the status check for the node
            //give the node some time before api status is called
            setTimeout(this.startRefreshNode, 10000);
          }else{
            this.$toast.error(this.$t("msg.app.external_node_offline"));
          }

        }
      },

      async nodeStatus(){

        let respNode = await this.$nodeService.getNodeStatus(this.store.state.user.nodeInternal);
        if(respNode){

          if(this.store.state.user.nodeInternal && this.configService.config.nodesynced == false){
            if(respNode.tip && respNode.tip.height > 0 && respNode.sync_status === 'no_sync'){
              this.configService.updateConfig({
                nodesynced: true,
                check_node_api_http_addr: 'http://127.0.0.1:3413'
              });
              this.configService.checkTomlFile();
              this.nodesyncedModalOpen();

            }
          }
          this.store.commit('nodeStatus', respNode);
        }else{
          if(this.store.state.user.nodeInternal){
            this.$toast.error(this.$t("msg.app.node_offline"));
          }else{
            this.$toast.error(this.$t("msg.app.external_node_offline"));
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

      /* refresh ngrok status */
      async startRefreshNgrok() {
          let refresh = _ => this.startRefreshNgrokId = setTimeout(this.startRefreshNgrok, 1000*30)

          try {
            let ngrokStatus = await this.$ngrokService.checkStatus();

            if(ngrokStatus){

              this.store.commit('ngrokTunnels', await this.$ngrokService.openTunnel());
              this.store.commit('ngrokService', true);

              if(this.store.state.user.ngrok_force_start){

                let timeFormat = this.$filters.timeFormat(this.$ngrokService.getTunnelLifetime());


                if(timeFormat.length && timeFormat[0] <= 0 && timeFormat[1] <= 0){

                  let restart = await this.$ngrokService.ngrokRestart();
                  if(restart){
                    this.$toast.warning(this.$t("msg.app.ngrok_address_changed"), {duration:false});
                    this.store.commit('ngrokTunnels', await this.$ngrokService.openTunnel());
                    timeFormat = this.$filters.timeFormat(this.$ngrokService.getTunnelLifetime());
                    this.store.commit('ngrokTunnelLifetime', timeFormat);

                  }else{
                    this.store.commit('ngrokService', false);
                    this.store.commit('ngrokTunnelLifetime', [0,0]);
                    this.store.commit('ngrokTunnels', {});
                  }
                }else{
                  this.store.commit('ngrokTunnelLifetime', timeFormat);
                }
              }

            }else{
              this.store.commit('ngrokService', false);
              this.store.commit('ngrokTunnelLifetime', [0,0]);
              this.store.commit('ngrokTunnels', {});
            }
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
                  "text": "Summary: " + summary.error.message,
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
                "text":   "Txs: " + txs.error.message,
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
                  "text": "Commits: " +  commits.error.message,
                  "icon":   "information"
            });

          }
      },
    }
  }

</script>
