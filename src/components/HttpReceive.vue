<template>

<div class="modal" :class="{'is-active': showModal}">
  <div class="modal-background" @click="closeModal"></div>
  <div class="modal-card" style="width:480px">
    <header class="modal-card-head">
      <p class="modal-card-title is-size-4 has-text-link has-text-weight-semibold">{{ $t("msg.receive") }}(HTTP/HTTPS)</p>
      <button class="delete" aria-label="close" @click="closeModal"></button>
    </header>
    <section class="modal-card-body" style="height:380px;background-color: whitesmoke;">
      <div v-if="running">
        <div class="message is-link">
          <div class="message-header" v-if="started"><p>{{ $t("msg.httpReceive.launchSucess") }}</p></div>
          <div class="message-header" v-else><p>{{ $t("msg.httpReceive.listening") }}</p></div>
          <div class="message-body">
            <p>{{ $t("msg.httpReceive.address") }} :</p>
            <p class="has-text-weight-semibold is-size-4" style="margin-top:15px;margin-bottom:15px">
              &nbsp; &nbsp; http://{{ip}}:3415 </p>
            <p>{{ $t("msg.httpReceive.reachableMsg2") }}</p>
          </div>
        </div>
        <button class="button is-link is-outlined"  @click="closeModal" >ok</button>
        &nbsp;&nbsp;
        <button class="button is-link" v-bind:class="{'is-loading': stopping }" @click="stop" v-show="!started">
          {{ $t("msg.httpReceive.close") }}
        </button>

      </div>
      <div v-else>
        <div class="notification is-warning" v-if="errors.length">
          <p v-for="error in errors" :key="error">{{ error }}</p>
        </div>
        <div class="center" v-show="errors.length>0">
          <a class="button is-link is-outlined" v-if="errors.length" @click="closeModal">OK</a>
        </div>

        <div v-show="errors.length==0">
          <div class="message is-warning">
            <div class="message-header"><p>{{ $t("msg.httpReceive.attention") }}</p></div>
            <div class="message-body">
              <p>{{ $t("msg.httpReceive.reachableMsg") }}</p>
            </div>
          </div>

          <div class="center">
            <div class="field is-grouped ">
              <div class="control">
                <button class="button is-link" v-bind:class="{'is-loading': starting}" @click="start">
                  {{ $t("msg.httpReceive.start") }}
                </button>
              </div>
              <div class="control">
                <button class="button is-text" @click="closeModal">{{ $t("msg.cancel") }}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</div>

</template>
<script>
const log = window.log


export default {
  name: "http-receive",
  props: {
    showModal: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      errors: [],
      starting: false,
      stopping: false,
      started: false,
      localReachable: false,
      running: false,
      ip: this.$t('msg.httpReceive.ip')
    }
  },
  methods: {

    async start(){

      if(!this.starting && !this.running){
        this.starting = true
        const isListen = await this.$walletService.startListen();
        if(isListen){
          this.started = true
          this.running = true
          log.debug('Http listen is locally reachable.')
          this.emitter.emit('walletListen')

        }
      }


    },
    async stop(){

      this.stopping = true;
      let killed = await this.$walletService.stopProcess('listen')
      if(killed){
        this.running = false
        this.emitter.emit('walletListen')
        this.clearup();
        this.closeModal()
      }
    },

    closeModal() {
      this.clearup()
      this.emitter.emit('close', 'windowHttpReceive');
    },

    clearup(){
      this.errors = []
      this.starting = false
      this.stopping = false
      this.started = false
    },

  }
}
</script>
<style>
.center{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
