<template>

<div class="modal" :class="{'is-active': showModal}">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title is-size-4 has-text-link has-text-weight-semibold">Mnemonic words</p>
    </header>
    <section class="modal-card-body" >


      <div v-if="checked">
        <p class="has-text-weight-semibold has-text-warning">
          {{ $t('msg.create.backupNote') }}
        </p>
        <p>&nbsp;</p>
        <div class="tags">
          <span style="color:#000000" class="tag is-light is-medium is-rounded is-link" v-for="seed in seeds" :key="seed">{{seed}}</span>
        </div>

        <button class="button is-link is-outlined center" @click="closeModal">ok</button>
      </div>

      <div v-else>

        <div class="field">
          <label class="label">{{ $t("msg.password") }}</label>
          <div class="control">
            <input class="input" type="password" placeholder="********" required v-model="password" :class="{'is-danger': error}">
          </div>
          <p class="help is-danger" v-if="error">{{errorInfo}}</p>

        </div>


        <div class="center">

          <div class="field is-grouped" >
            <div class="control">
              <button class="button is-link" v-bind:class="{'is-loading':checking}" @click="start">
                {{ $t("msg.check.start") }}
              </button>
            </div>
            <div class="control">
              <button class="button is-text" @click="closeModal">{{ $t("msg.cancel") }}</button>
            </div>

          </div>

        </div>

      </div>

    </section>
  </div>
</div>

</template>
<script>

export default {
  name: "seed",
  props: {
    showModal: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      checked:false,
      password: '',
      error: false,
      errorInfo: '',
      seeds:[],
    }
  },

  methods: {

    async start(){
      this.checked = false;

      if(this.password.length == 0 ){
        this.error = true;
        this.errorInfo = this.$t('msg.create.errorPasswdEmpty');
        return;
      }

      let res = await this.$walletService.getMnemonic(this.password);
      if(res && res.result.Ok){
        let valueChunks = res.result.Ok.split(" ").map(item => item.trim());
        this.checked = true;
        this.seeds = valueChunks;
      }else{
        this.error = true;
        this.errorInfo = this.$t('msg.seed.errorGetMnemonic');
      }
    },

    closeModal() {
      if(!this.checking)this.clearup()
      this.emitter.emit('close', 'windowSeed');
    },

    clearup(){
      this.password = '';
      this.checked = false;
      this.error = false;
      this.errorInfo = '';
      this.seeds = [];

    },
  }
}
</script>
