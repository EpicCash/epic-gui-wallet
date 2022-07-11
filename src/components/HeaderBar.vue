<template>
  <section>

    <section class="section is-title-bar">
        <div class="level">
          <div class="level-left">
            <div class="level-item">
              <ul>
                <li>{{ route.meta.title }}</li>
              </ul>
            </div>
          </div>
        </div>
    </section>

    <section class="hero is-hero-bar is-main-hero">
        <div class="hero-body" id="headerbar">
          <div class="level">
            <div class="level-left">
              <div class="level-item is-hero-avatar-item">
                  <div class="avatar-letter big" :data-letters="newAvatar"></div>
              </div>
              <div class="level-item is-hero-content-item">
                <div>
                  <h1 class="title is-spaced">Howdy, <b>{{ userName }}</b></h1>
                  <h3 class="subtitle">
                    <span @click="hideValues">
                      <mdicon v-if="!store.state.hideValues" name="eye-outline" />
                      <mdicon v-else name="eye-off-outline" />
                    </span>
                    {{ $t("msg.info.total") }}: <span v-bind:class="{'amount-hidden': store.state.hideValues }" style="color: #d19944;">{{store.state.summary.total}} EPIC</span>&nbsp;<span v-bind:class="{'is-hidden': store.state.hideValues }" class="is-size-7">&#x2248; ${{ usdPrice }}</span>

                  </h3>
                  <h3 class="subtitle"><mdicon name="server-network" style="color: green;" /> Node ({{ store.state.nodeType}})</h3>


                </div>
              </div>
            </div>
            <div class="level-right">
              <div class="level-item is-hero-content-item">
                <div>
                  <div>Node Version: {{store.state.nodeStatus.user_agent}}</div>
                  <div>Connected peers: {{store.state.nodeStatus.connections}}</div>
                  <div>Status: {{store.state.nodeStatus.sync_status}}</div>

                    <div v-if="store.state.nodeStatus.sync_status != 'synced'">Sync Height: {{currentHeight}}&nbsp;/&nbsp;{{highestHeight}} ({{loaded}}%)</div>
                    <div v-else >Blockchain Height: {{height}}</div>
                  <div>
                    <progress v-if="store.state.nodeStatus.sync_status != 'synced'" style="margin-top:5px;" class="progress is-success is-small" :value="currentHeight" :max="highestHeight">0%</progress>
                    <progress v-else style="margin-top:5px;" class="progress is-success is-small" :value="100" :max="100"></progress>
                  </div>



                </div>
              </div>
            </div>
          </div>
        </div>
    </section>

  </section>
</template>

<script>


import { computed, ref } from 'vue';
import { useStore } from '@/store';
import { useRoute } from 'vue-router';

export default {
  name: "headerbar",
  watch: {
      'store.state.summary.total': async function (newVal) {

        if(newVal){

          let geckoPrice = await window.config.getPrice();
          if(geckoPrice.length >= 1){
            this.usdPrice = parseFloat(geckoPrice[0].current_price * this.store.state.summary.total).toFixed(2);
          }
        }
      },
  },
  setup() {

    const store = useStore();
    const route = useRoute();
    const userName = computed(() => store.state.user.name)
    const newAvatar = computed(() => store.state.userAvatar)
    const currentHeight = computed(() => store.state.nodeStatus.sync_info.current_height ? store.state.nodeStatus.sync_info.current_height : 0);
    const highestHeight = computed(() => store.state.nodeStatus.sync_info.highest_height ? store.state.nodeStatus.sync_info.highest_height : 0);
    const height = computed(() =>   store.state.nodeStatus.tip.height ? store.state.nodeStatus.tip.height : 0);
    const loaded = computed(() => store.state.nodeStatus.sync_info.current_height > 0 && store.state.nodeStatus.sync_info.highest_height > 0 ? parseFloat(store.state.nodeStatus.sync_info.current_height/store.state.nodeStatus.sync_info.highest_height*100).toFixed(2) : 0);
    const usdPrice = ref(0);

    return{
        store,
        route,
        userName,
        newAvatar,
        currentHeight,
        highestHeight,
        height,
        loaded,
        usdPrice
    }
  },

  methods:{
    async hideValues(){
      this.store.commit('hideValues');
    },
  }

}
</script>
