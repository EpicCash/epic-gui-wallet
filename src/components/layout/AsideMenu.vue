<template>
  <aside
    v-show="isAsideVisible"
    class="aside is-placed-left"
    :class="{'is-expanded':isAsideExpanded}"
    id="aside-main"
  >


    <div class="aside-tools">
      <div class="aside-tools-label">
        <img src="../../assets/img/epiccash-brand.png" style="width: 25px; margin-top: 13px;">
      </div>
    </div>
    <div class="menu-container">
      <div class="menu is-menu-main">
        <p class="menu-label">General</p>
        <ul class="menu-list">
          <li>
            <router-link class="has-icon" to="/dashboard">
              <span class="icon"><mdicon name="desktop-mac" /></span>
              <span class="menu-item-label">Dashboard</span>
            </router-link>

          </li>
          <li>
            <router-link class="has-icon" to="/addressBook">
              <span class="icon"><mdicon name="book-open-outline" /></span>
              <span class="menu-item-label">Address Book</span>
            </router-link>
          </li>
        </ul>
        <p class="menu-label">SEND</p>
        <ul class="menu-list">
          <li>
            <router-link class="has-icon" to="/httpSend">
              <span class="icon"><mdicon name="package-up" /></span>
              <span class="menu-item-label">Send</span>
            </router-link>
          </li>

          <li>
            <router-link class="has-icon" to="/finalizeTransaction">
              <span class="icon"><mdicon name="basket" /></span>
              <span class="menu-item-label">Finalize offline transaction</span>
            </router-link>
          </li>

        </ul>


        <p class="menu-label">RECEIVE</p>
        <ul class="menu-list">
          <li>
            <router-link class="has-icon" to="/httpReceive">
              <span class="icon"><mdicon name="package-down" /></span>
              <span class="menu-item-label">Receive</span>
            </router-link>
          </li>
          <li>
            <router-link class="has-icon" to="/importTransaction">
              <span class="icon"><mdicon name="basket-fill" /></span>
              <span class="menu-item-label">Import offline transaction</span>
            </router-link>
          </li>

        </ul>
        <p class="menu-label">MISC</p>
        <ul class="menu-list">
          <li>
            <router-link class="has-icon" to="/about">
              <span class="icon"><mdicon name="information-outline" /></span>
              <span class="menu-item-label">About</span>
            </router-link>
          </li>
          <li>
            <router-link class="has-icon" to="/help">
              <span class="icon"><mdicon name="account-question-outline" /></span>
              <span class="menu-item-label">Help</span>
            </router-link>
          </li>
        </ul>
      </div>
  </div>
    <div class="menu is-menu-bottom">
      <ul class="menu-list">
        <li>
          <a :class="{ 'button__loader': isLoading }" @click="logout" title="Log out" class="has-icon is-state-info is-hoverable">
            <span class="button__text">
              <span class="icon"><mdicon name="logout" /></span>
              <span class="menu-item-label">Log out</span>
            </span>
          </a>
        </li>
      </ul>
    </div>

  </aside>
</template>

<script>
import { useStore } from '@/store'
import { computed, ref } from 'vue'
import { useRouter } from '@/router'


export default {
  name: 'AsideMenu',

  setup (props, { emit }) {
    const store = useStore()
    const router = useRouter();
    const isAsideVisible = computed(() => store.state.isAsideVisible)
    const isAsideExpanded = computed(() => store.state.isAsideExpanded)
    const isLoading = ref(false);



    return {
      isAsideVisible,
      isAsideExpanded,
      isLoading,
    }
  },
  methods: {

    async logout(){
      this.isLoading = true;
      this.emitter.emit('app.logout')
    }
  }

}
</script>
