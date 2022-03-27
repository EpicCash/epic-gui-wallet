<template>

<div class="modal" :class="{'is-active': showModal}">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title is-size-4 has-text-link has-text-weight-semibold">{{ $t("msg.firstruncheck.title") }}</p>
      <button class="delete" aria-label="close" @click="closeModal"></button>
    </header>
    <section class="modal-card-body" >
      <div>

        <div class="message is-link">
          <div class="message-header" ><p>{{ $t("msg.check.checking") }}</p></div>
          <div class="message-body">
            <div class="control">
              <p class="is-size-7" v-for="output in checkOutputs" :key="output">{{ output }}</p>
          </div>
          </div>
        </div>
        <div class="center">

          <div class="field is-grouped" >
            <div class="control">
              <button class="button is-text" @click="closeModal">{{ $t("msg.close") }}</button>
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
  name: "firstruncheck",
  props: {
    showModal: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {

      checkOutputs: [],
      openStopMsg: false,
      stopMsg: this.$t("msg.check.stopCheckMsg"),
      password: '',
      delete_unconfirmed: null,
      error: false,
      errorInfo: ''
    }
  },
  created() {
      window.nodeChildProcess.on('scan-finish', () => {

        log.debug('Got walletCheckFinished message.')

      })
  },
  mounted() {
    // handle reply from the backend
    window.nodeChildProcess.on('scan-stdout', (payload) => {
      this.checkOutputs.push(payload.data)
    });
  },
  methods: {

    closeModal() {
      this.clearup()
      this.emitter.emit('close', 'windowFirstrunCheck');
    },

    clearup(){

      this.checkOutputs = []
      this.openStopMsg = false
      this.openCheckedMsg = false
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
