<template>
  <div v-show="!this.configCheckReady"><p>start wallet</p></div>

  <login v-show="view === 'login'"></login>
  <restore v-show="view === 'restore'"></restore>
  <create v-show="view === 'create'"></create>
  <dashboard v-show="view === 'dashboard'"></dashboard>

</template>

<script>

  const log = window.log;
  const clipboard = window.clipboard;


  import mixin from './mixin.js'
  import { useI18n } from 'vue-i18n/index'
  import { ref, defineEmits } from 'vue';


  //app components
  import Login from './components/Login.vue';
  import Restore from './components/Restore.vue';
  import Create from './components/Create.vue';
  import Dashboard from './components/Dashboard.vue';

  export default {
    name: 'Epic GUI Wallet',
    mixins: [mixin],
    components: {
      Login,
      Restore,
      Create,
      Dashboard,
    },
    setup() {

      const { locale } = useI18n();
      const configCheckReady = ref(false);
      const view = ref('init');
      const loggedIn = ref(false);

      return {
        locale, configCheckReady, view
      }

    },
    created() {

      this.emitter.on('app.changeView', (view) => {
        this.view = view;
      });

      this.emitter.on('app.accountLoggedIn', async () => {

        this.loggedIn = true;
        await this.$nodeService.internalNodeStart(false);
        let resp = await this.$nodeService.nodeOnline();
        console.log('nodeStarted', resp);
        let address = await this.$addressBookService.getAddress();
        console.log('getAddress', address);
        this.view = 'dashboard';
      });

      this.emitter.on('killEpicProcess', async (callback) => {
        //todo replace with customized dialog/prompt
        const confirmed = await confirm('We found some running wallet and node processes in the background. Please close them first before you can run this App.');
        callback(confirmed);
      });


    },
    async mounted() {

      //App main window min size
      window.api.resize(1160, 850);

      //App has started - first close running wallet and node server process
      await this.configService.killEpicProcess();


      if(this.configService.appHasAccounts()){
        //continue to login
        this.configCheckReady = true;
        this.view = 'login';

      } else {
        //todo init app process here
        console.log('app has no accounts');
        //1. select new recover existing wallet
        //2. settings network type, node address language


      }

    },

    methods: {




    }

  }




</script>
