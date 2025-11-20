<template>
  <div class="modal"
    v-bind:class="{'is-active': isModalActive}"
  >
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">

          {{ t("msg.confirm_action") }}

        </p>

      </header>
      <section class="modal-card-body">

        <div v-for="process in processList" :key="process.id"  >
            ID: {{process.pid}} / Process name: {{process.name}}
        </div>
        <p v-if="processList.length">&nbsp;</p>
        {{ t("msg.app.background_process") }}
      </section>
      <footer class="modal-card-foot">
        <button class="button is-danger" @click="cancel">
          {{ t("msg.cancel") }}
        </button>
        <button :class="{ 'button__loader_success': isLoading }" class="button is-success" @click="confirm">
          <span>{{ t("msg.close_all_process") }}</span>
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
import {ref, computed } from 'vue'
import { useI18n } from 'vue-i18n';
import { inject } from 'vue'

window.killRunningEpicPids = null;
export default {
  name: 'KillProcessModalBox',
  setup (props, { emit }) {
    const emitter = inject('emitter');
    const { t } = useI18n();
    const processList = ref([]);
    const isModalActive = ref(false);
    const isLoading = ref(false);
    return {
      isModalActive,
      processList,
      isLoading,
      t,
      emitter
    }
  },
  methods:{

    confirm(){
      this.isLoading = true;
      window.killRunningEpicPids = true;
    },
    cancel(){
      window.killRunningEpicPids = false;
    },
    waitForCondition (variable) {
      function waitFor(result) {
        if (result != null) {
          return result;
        }
        return new Promise((resolve) => setTimeout(resolve, 100))
          .then(() => Promise.resolve(window[variable]))
          .then((res) => waitFor(res));
      }
      return waitFor();
    }
  },
  created(){

    this.emitter.on('killEpicProcess', async(killEpicProcess) => {

      this.isModalActive = true;
      this.processList = killEpicProcess.pid;
      let confirmed = await this.waitForCondition('killRunningEpicPids').then((res) => {
        return res;
      });
      await killEpicProcess.callback(confirmed);
      this.isModalActive = false;
      this.isLoading = false;
      window.killRunningEpicPids = null;

    });
  },

}
</script>
