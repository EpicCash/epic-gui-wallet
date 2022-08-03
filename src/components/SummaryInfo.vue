<template>


  <div class="tile is-ancestor">
    <div class="tile is-parent">
          <div class="card is-card-widget tile is-child">
            <div class="card-content">
              <div class="level is-mobile">
                <div class="level-item">
                  <div class="is-widget-label">
                    <h3 class="subtitle is-spaced is-6">{{ $t("msg.info.spendable") }}:</h3>
                    <h2 class="title is-4">
                      <span v-bind:class="{'amount-hidden': store.state.hideValues }" >{{summary.spendable}}</span>
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="tile is-parent">
          <div class="card is-card-widget tile is-child">
            <div class="card-content">
              <div class="level is-mobile">
                <div class="level-item">
                  <div class="is-widget-label">
                    <h3 class="subtitle is-spaced is-6">{{ $t("msg.unconfirmed") }}:</h3>
                    <h2 class="title is-4">
                      <span v-bind:class="{'amount-hidden': store.state.hideValues }" >{{summary.unconfirmed}}</span>
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="tile is-parent">
          <div class="card is-card-widget tile is-child">
            <div class="card-content">
              <div class="level is-mobile">
                <div class="level-item">
                  <div class="is-widget-label">
                    <h3 class="subtitle is-spaced is-6">{{ $t("msg.info.unfinalization") }}:</h3>
                    <h2 class="title is-4">
                      <span v-bind:class="{'amount-hidden': store.state.hideValues }" >{{summary.unfinalization}}</span>
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="summary.immature>0" class="tile is-parent">
          <div class="card is-card-widget tile is-child">
            <div class="card-content">
              <div class="level is-mobile">
                <div class="level-item">
                  <div class="is-widget-label">
                    <h3 class="subtitle is-spaced is-6">{{ $t("msg.info.immature") }}:</h3>
                    <h2 class="title is-4">
                      <span v-bind:class="{'amount-hidden': store.state.hideValues }" >{{summary.immature}}</span>
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="tile is-parent">
          <div class="card is-card-widget tile is-child">
            <div class="card-content">
              <div class="level is-mobile">
                <div class="level-item">
                  <div class="is-widget-label">
                    <h3 class="subtitle is-spaced is-6">{{ $t("msg.locked") }}:</h3>
                    <h2 class="title is-4">
                      <span v-bind:class="{'amount-hidden': store.state.hideValues }" >{{summary.locked}}</span>
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  </div>

</template>

<script>

  import { ref, computed } from 'vue';
  import { useStore } from '@/store'

  export default {
    name: 'summary-info',

    setup(){

      const store = useStore();
      const summary = computed(() => store.state.summary)

      return {
        store,
        summary,
      }

    },

  }
</script>
