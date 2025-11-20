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
                  <h1 class="title is-spaced">{{ t('msg.headerbar.howdy') }} <b>{{ userName }}</b></h1>
                  <h3 class="subtitle">
                    <span class="is-clickable" @click="hideValues">
                      <mdicon size=20 v-if="!store.state.hideValues" name="eye-outline" />
                      <mdicon size=20 v-else name="eye-off-outline" />
                    </span>
                    {{ t("msg.info.total") }}: <span v-bind:class="{'amount-hidden': store.state.hideValues }" style="color: #d19944;">{{ $filters.currencyFormat(store.state.summary.total, locale) }} EPIC</span>&nbsp;<span v-bind:class="{'is-hidden': store.state.hideValues }" class="is-size-7">&#x2248; ${{ $filters.currencyFormat(usdPrice, locale) }}</span>

                  </h3>



                </div>
              </div>
            </div>
            <div class="level-right">
              <div class="level-item is-hero-content-item" style="position:relative;">

                <div class="is-size-7" :style="store.state.nodeStatus.user_agent ? '' : 'opacity:0.2'">
                  <h3 class="subtitle" >
                    <span class="externalnode">
                    <mdicon class="show-pointer" v-if="store.state.nodeType == 'internal' && !nodeRestarting" size=20 name="restart" @click.prevent="restartNode" />
                    <mdicon v-if="store.state.nodeType == 'internal' && nodeRestarting" size=20 />
                    <span v-if="!this.configService.config.nodesynced"><mdicon size=18 name="server-network" />{{ t('msg.headerbar.node') }} ({{this.nodeFallBack}})</span>
                    <span v-if="this.configService.config.nodesynced"><mdicon size=18 name="server-network" /> {{ t('msg.headerbar.node') }} ({{store.state.nodeType}})</span>
                    </span>
                  </h3>

                  <div v-if="!this.configService.config.nodesynced">{{ t('msg.headerbar.node_sync_status') }}</div>
                  <div>{{ t('msg.headerbar.version') }}: {{store.state.nodeStatus.user_agent}}</div>
                  <div>{{ t('msg.headerbar.peers') }}: {{store.state.nodeStatus.connections}}</div>
                  <div>{{ t('msg.headerbar.status') }}: {{store.state.nodeStatus.sync_status}}</div>

                    <div v-if="store.state.nodeStatus.sync_status != 'synced'">{{ t('msg.headerbar.progress') }}: {{currentHeight}}&nbsp;/&nbsp;{{highestHeight}} ({{loaded}}%)</div>
                    <div v-else >{{ t('msg.headerbar.block_height') }}: {{height}}</div>
                  <div>
                    <progress v-if="store.state.nodeStatus.sync_status != 'synced'" style="margin-top:5px;" class="progress is-success is-small" :value="currentHeight" :max="highestHeight">0%</progress>
                    <progress v-else style="margin-top:5px;" class="progress is-success is-small" :value="100" :max="100"></progress>
                  </div>

                </div>
                <div v-if="store.state.nodeStatus.user_agent == undefined" style="opacity:0.8;" class="is-overlay is-align-items-center is-flex is-justify-content-center " ><span style="opacity:0.8;" class="has-background-light has-text-black-bis tag">... loading</span></div>
              </div>
            </div>
          </div>
        </div>
    </section>

  </section>
</template>

<script>


import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from '../store';
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

    const { t } = useI18n();
    const store = useStore();
    const route = useRoute();
    const userName = computed(() => store.state.user.name)
    const newAvatar = computed(() => store.state.userAvatar)
    const currentHeight = computed(
      () => {
        let size = 0;
        if(store.state.nodeStatus.sync_info.current_height > 0){
          size = store.state.nodeStatus.sync_info.current_height;
        }
        if(store.state.nodeStatus.sync_info.downloaded_size > 0){
          size = store.state.nodeStatus.sync_info.downloaded_size;
        }
        if(store.state.nodeStatus.sync_info.rproofs > 0){
          size = store.state.nodeStatus.sync_info.rproofs;
        }
        if(store.state.nodeStatus.sync_info.kernels > 0){
          size = store.state.nodeStatus.sync_info.kernels;
        }
        return size;
      }
    );
    const highestHeight = computed(
      () => {

        let size = 0;
        if(store.state.nodeStatus.sync_info.highest_height > 0){
          size = store.state.nodeStatus.sync_info.highest_height;
        }
        if(store.state.nodeStatus.sync_info.total_size > 0){
          size = store.state.nodeStatus.sync_info.total_size;
        }
        if(store.state.nodeStatus.sync_info.rproofs_total > 0){
          size = store.state.nodeStatus.sync_info.rproofs_total;
        }
        if(store.state.nodeStatus.sync_info.kernels_total > 0){
          size = store.state.nodeStatus.sync_info.kernels_total;
        }
        return size;
      }
    );




    const height = computed(() =>   store.state.nodeStatus.tip.height ? store.state.nodeStatus.tip.height : 0);
    const loaded = computed(
      () => {
        let size = 0;
        if(store.state.nodeStatus.sync_info.current_height > 0 && store.state.nodeStatus.sync_info.highest_height > 0){
          size = parseFloat(store.state.nodeStatus.sync_info.current_height/store.state.nodeStatus.sync_info.highest_height*100).toFixed(2);
        }

        if(store.state.nodeStatus.sync_info.downloaded_size > 0 && store.state.nodeStatus.sync_info.total_size > 0){
          size = parseFloat(store.state.nodeStatus.sync_info.downloaded_size/store.state.nodeStatus.sync_info.total_size*100).toFixed(2);
        }

        if(store.state.nodeStatus.sync_info.rproofs > 0 && store.state.nodeStatus.sync_info.rproofs_total > 0){
          size = parseFloat(store.state.nodeStatus.sync_info.rproofs/store.state.nodeStatus.sync_info.rproofs_total*100).toFixed(2);
        }

        if(store.state.nodeStatus.sync_info.kernels > 0 && store.state.nodeStatus.sync_info.kernels_total > 0){
          size = parseFloat(store.state.nodeStatus.sync_info.kernels/store.state.nodeStatus.sync_info.kernels_total*100).toFixed(2);
        }


        return size;

      }
    );
    const usdPrice = ref(0);
    const locale = ref('en');
    const nodeFallBack = ref('');
    const nodeRestarting = ref(false);

    return{
        store,
        route,
        userName,
        newAvatar,
        currentHeight,
        highestHeight,
        height,
        loaded,
        usdPrice,
        locale,
        nodeFallBack,
        nodeRestarting,
        t
    }
  },
  async created(){
    //this.locale = await window.api.locale();
    this.nodeFallBack = this.configService.getNodeFallBack();

  },
  methods:{
    async hideValues(){
      this.store.commit('hideValues');
    },
    async restartNode(){
      this.nodeRestarting = true;
      await this.emitter.emit('app.restartNode');
      this.nodeRestarting = false;
    }
  }

}
</script>
