<template>
  <nav
    v-show="isNavBarVisible"
    id="navbar-main"
    class="navbar"
    :class="navBarClass"
  >
    <div class="navbar-brand no-negative-margin-left">

      <a
        :title="toggleTooltip"
        class="navbar-item is-desktop-icon-only"
        @click.prevent="asideToggle"
      >
        <span class="icon">


          <mdicon v-if="isAsideExpanded" class="icon" name="backburger"  />
          <mdicon v-else class="icon" name="forwardburger"  />

        </span>
      </a>


      <div class="navbar-item has-control no-left-space">
        <div class="control">

        </div>
      </div>
    </div>

    <div
      class="navbar-menu fadeIn animated faster"
      :class="{'is-active':isMenuNavBarActive, 'no-negative-margin-right':isLayoutBoxed}"
    >

      <div class="navbar-end">
        <nav-bar-menu class="has-divider ">

          <div class="is-user-name">
            <span style="padding-right:120px;"></span><mdicon name="cog-outline" />
          </div>


            <div class="navbar-dropdown">

              <router-link class="navbar-item" to="/account">
                <span class="icon"><mdicon name="account" /></span>
                <span>Account</span>
              </router-link>
              <router-link class="navbar-item" to="/settings">
                <span class="icon"><mdicon name="settings" /></span>
                <span>Settings</span>
              </router-link>
              <router-link class="navbar-item" to="/recheckBalance">
                <span class="icon"><mdicon name="sync" /></span>
                <span>Recheck Balance</span>
              </router-link>
              <router-link class="navbar-item" to="/mnemonic">
                <span class="icon"><mdicon name="spellcheck" /></span>
                <span>Mnemonic Words</span>
              </router-link>
              <router-link class="navbar-item" to="/setupwizard">
                <span class="icon"><mdicon name="wizard-hat" /></span>
                <span>Run Setup Assistant</span>
              </router-link>

              <hr class="navbar-divider">
              <a :class="{ 'button__loader': isLoading }" @click="logout" class="navbar-item">
                <span class="button__text">
                  <span class="icon"><mdicon name="logout" /></span>
                  <span>Log Out</span>
                </span>
              </a>
          </div>


        </nav-bar-menu>

      </div>
      <a title="Updates" class="navbar-item has-divider is-desktop-icon-only "
        @click.prevent="updatesToggle"
        :class="{'is-active':isAsideRightActive}"
      >
        <span :class="{'has-update-mark':hasUpdates}" class="icon"><mdicon :class="{'animated':hasUpdates}" class="icon faa-ring " name="bell" /></span>
        <span>Updates</span>
      </a>

    </div>
  </nav>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from '@/store'
import { useRouter } from '@/router'
import NavBarMenu from '@/components/layout/NavBarMenu.vue'

export default {
  name: 'NavBar',
  components: {
    NavBarMenu
  },

  setup (props, { emit }) {
    const isMenuNavBarActive = ref(false)
    const isExpanded = ref(true);
    const menuNavBarToggleIcon = computed(() => isMenuNavBarActive.value ? 'close' : 'dots-vertical')



    const toggleTooltip = computed(() => isAsideExpanded.value ? 'Collapse' : 'Expand')

    const navBarClass = computed(() => {
      const base = []

      if (!isLayoutBoxed.value) {
        base.push('is-fixed-top')
      }

      if (navBarColor.value) {
        base.push(navBarColor.value)
      }

      return base
    })

    const store = useStore()


    const isLayoutAsideHidden = computed(() => store.state.isLayoutAsideHidden)
    const isLayoutBoxed = computed(() => store.state.isLayoutBoxed)
    const isNavBarVisible = computed(() => store.state.isNavBarVisible)
    const navBarColor = computed(() => store.state.navBarColor)
    const isAsideVisible = computed(() => store.state.isAsideVisible)
    const isAsideExpanded = computed(() => store.state.isAsideExpanded)

    const isAsideRightActive = computed(() => store.state.isAsideRightActive)
    const userName = computed(() => store.state.user.name)
    const newAvatar = computed(() => store.state.userAvatar)
    const hasUpdates = computed(() => store.state.hasUpdates)

    const router = useRouter()
    const isLoading = ref(false);

    router.afterEach(() => {
      isMenuNavBarActive.value = false
    })

    const asideToggle = () => {
      store.commit('asideStateToggle')

    }

    const menuNavBarToggle = () => {
      isMenuNavBarActive.value = !isMenuNavBarActive.value
    }

    const updatesToggle = () => {
      store.dispatch('asideRightToggle')
    }

    return {
      isMenuNavBarActive,
      menuNavBarToggleIcon,
      toggleTooltip,
      navBarClass,
      isLayoutAsideHidden,
      isLayoutBoxed,
      isNavBarVisible,
      navBarColor,
      isAsideVisible,
      isAsideExpanded,
      isAsideRightActive,
      userName,
      newAvatar,
      hasUpdates,
      asideToggle,
      menuNavBarToggle,
      updatesToggle,
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
