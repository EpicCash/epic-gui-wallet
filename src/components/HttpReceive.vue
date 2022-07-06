<template>

  <section class="section is-main-section">


    <div v-if="running">



      <div class="message is-link">
        <div class="message-header" v-if="started"><p>{{ $t("msg.httpReceive.launchSucess") }}</p></div>
        <div class="message-header" v-else><p>{{ $t("msg.httpReceive.listening") }}</p></div>
        <div class="message-body">

          <p>Ngrok Address: {{ ngrokAddress }}</p>
          <p>Tor onion Address: {{ onionAddress }}</p>

        </div>

      </div>

    </div>
    <div v-else>



      <div>
        <div class="message is-warning">
          <div class="message-header"><p>{{ $t("msg.httpReceive.attention") }}</p></div>
          <div class="message-body">
            <p>{{ $t("msg.httpReceive.reachableMsg") }}</p>
          </div>
        </div>


        <div class="field is-horizontal">
          <div class="field-label is-normal"><label class="label">{{ $t("msg.password") }}</label></div>
          <div class="field-body">

            <input class="input" type="password" placeholder="********" required v-model="password" >

          </div>
        </div>

        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Method</label>
          </div>
          <div class="field-body">
                <div class="select">
                  <select v-model="method">
                    <option value="http">Http</option>
                    <option value="keybase">Keybase</option>
                  </select>
                </div>
          </div>
        </div>

        <div class="field is-horizontal">
          <div class="field-label">
            <label class="label">TOR</label>
          </div>
          <div class="field-body">
                <label class="checkbox">
                  <input type="checkbox" name="tor" v-model="tor">
                  enable
                </label>
          </div>
        </div>

        <div class="field is-horizontal">
          <div class="field-label">
            <label class="label">TOR Onion address</label>
          </div>
          <div class="field-body">
          <span v-if="onionAddress" class="" >
            <button class="button is-small is-rounded">{{ onionAddress }}</button>
            &nbsp;<span @click="copyOnionAdress()"></span>
            <span v-if="!showCopyOnionAddress">&nbsp;{{ $t("msg.commit.copied") }}</span>
          </span>
          </div>
        </div>


        <p>&nbsp;</p>
        <p>&nbsp;</p>
        <div class="center">

          <div class="field is-grouped ">
            <div class="control">
              <button class="button is-link" @click="start">
                {{ $t("msg.httpReceive.start") }}<span v-if="starting">&nbsp;</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  </section>

</template>
<script>


import { ref,onMounted } from 'vue';
import { useStore } from '@/store';



const clipboard = window.clipboard;

export default {
  name: "http-receive",
  data() {
    return {

      starting: false,
      stopping: false,
      started: false,
      localReachable: false,
      password: '',
      method: 'http',
      tor: false,
      showCopyOnionAddress: true,

    }
  },
  setup(){

    const store = useStore();
    const onionAddress = ref('');
    const ngrokAddress = ref('');
    const running = ref(false);

    return {
      store,
      onionAddress,
      ngrokAddress,
      running,
    }
  },
  mounted(){
    this.onionAddress = this.getOnionAddress();
    this.running = this.store.state.walletListenerService;
    this.ngrokAddress = this.$ngrokService.getAddress();
  },
  methods: {
    async getOnionAddress(){
      let addressRes = await this.$walletService.getPubliProofAddress();
      if(addressRes.result.Ok){

        this.address = addressRes.result.Ok;

        if(this.address != ''){
          this.onionAddress = window.config.getOnionV3(this.address);
        }

      }
    },

    copyOnionAdress(){
      clipboard.writeText(this.onionAddress);
      this.showCopyOnionAddress = false;
      setTimeout(()=> {
        this.showCopyOnionAddress = true;
      }, 2000)


    },
    async start(){

      this.clearup();



      if(!this.starting && !this.running){

        this.starting = true
        const isListen = await this.$walletService.startListen(this.password, this.tor, this.method);

        if(isListen.success){


          this.started = true
          this.running = true

          this.emitter.emit('walletListen')

        }else if(isListen.success == false){

          this.starting = false;


        }

      }
      this.password = '';


    },
    async stop(){

      this.stopping = true;
      let killed = await this.$walletService.stopProcess('listen')
      if(killed){
        this.running = false
        this.emitter.emit('walletListen')
        this.clearup();

      }
    },


    clearup(){


      this.starting = false;
      this.stopping = false;
      this.started = false;

    },

  }
}
</script>
