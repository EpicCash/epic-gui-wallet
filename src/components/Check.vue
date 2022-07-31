<template>

    <section class="section is-main-section">
      <div class="columns">
        <div class="column">



      <div v-if="!checking">
        <div class="message is-info">
          <div class="message-header"><p>{{ $t("msg.check.introTitle") }}</p></div>
          <div class="message-body">
            <p>{{ $t("msg.check.intro1") }}</p>
          </div>
        </div>

        <div class="columns">
          <div class="column is-half">
            <div class="field">
              <label class="label">{{ $t("msg.password") }}</label>
              <div class="control has-icons-right">
                <PasswordField ref="passwordField" placeholder="********" required="true" name="password" />
              </div>
            </div>
            <div class="field">
              <div class="control">
                  <input class="switch is-success" id="unconfirmedSwitch" type="checkbox" v-model="delete_unconfirmed">
                  <label for="unconfirmedSwitch">{{ $t("msg.check.delete_unconfirmed") }}</label>
              </div>

            </div>
            <div class="field" >
                <div class="control">

                  <button type="submit" class="button is-primary" @click.prevent="start">
                    <span class="button__text">{{ $t("msg.check.start") }}</span>
                  </button>
                </div>

            </div>
          </div>
        </div>

      </div>
      <div v-else>
        <div class="message is-info" style="height:300px;max-height:300px;overflow-y:scroll;">

          <div class="message-header" v-if="checking"><p>{{ $t("msg.check.checking") }}</p></div>
          <div class="message-body">
            <div class="control">

              <p class="is-size-7" v-for="output in checkOutputs" :key="output">{{ output }}</p>
          </div>
          </div>
        </div>

        <div class="field">
          <div class="control">
            <button type="submit" class="button is-primary" @click.prevent="stop">
              <span class="button__text">{{ $t("msg.check.stop") }}</span>
            </button>
          </div>
        </div>

        </div>

      </div>


      <div v-if="checking">



</div><!-- end column -->

</div>

    </section>


</template>
<script>
const log = window.log

import { ref } from 'vue';
import PasswordField from "@/components/form/passwordField";
import useFormValidation from "@/modules/useFormValidation";
export default {
  name: "check",
  components: {
    PasswordField,

  },
  setup() {

    const passwordField = ref('');
    const checking = ref(false);
    const checkOutputs = ref([]);
    const delete_unconfirmed = ref();
    const { resetFormErrors } = useFormValidation();

    return {
      passwordField,
      resetFormErrors,
      checking,
      checkOutputs,
      delete_unconfirmed


    }

  },
  created() {
      window.nodeChildProcess.on('scan-finish', () => {
        if(this.checking){
          log.debug('Got walletCheckFinished message.')
          this.checking = false;
          this.checkOutputs = [];
          this.emitter.emit('app.update');
          this.$toast.success(this.$t("msg.check.scan_finished"));
        }

      });

      window.nodeChildProcess.on('scan-error', () => {
        if(this.checking){

          this.$toast.error(this.$t("msg.check.error_scan"));
        }

      })

  },
  mounted() {
    // handle reply from the backend
    window.nodeChildProcess.on('scan-stdout', (payload) => {

      let lines = payload.data.split("\n");
      for(var i = 0;i<lines.length;i++){
        let cleanString = lines[i].replace(/^.+(?:WARN\s|DEBUG\s)/gm, '');
        if(cleanString !== lines[i]){
          this.checkOutputs.unshift("\n"+cleanString);
        }
      }

    });

  },
  methods: {

    start(){
      this.resetFormErrors();

      let isFormAllValid = [];

      isFormAllValid.push(this.passwordField.validInput());

      //check now requires settings
      if(!isFormAllValid.includes(false)){
        this.checking = true;

        this.$walletService.check(this.passwordField.defaultValue, this.delete_unconfirmed);
      }
    },

    stop(){
      this.$walletService.stopCheck()
      this.checking = false;
      this.$toast.success(this.$t("msg.check.scan_stop"));

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
