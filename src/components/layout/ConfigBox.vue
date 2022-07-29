<template>
  <div
    v-if="isConfigBoxVisible"
    class="config-box"
  >
    <span
      v-if="!isOpen"
      class="icon trigger is-large"
      @click="isOpen = true"
    >
      <i class="mdi mdi-settings mdi-36px" />
    </span>
    <div
      v-else
      class="config-wrapper"
    >
      <b-field label="App style">
        <checkbox-radio-picker
          v-model="style"
          :options="{default:'Default', light:'Light', dark:'Dark'}"
          no-grouped-multiline
          no-grouped
          no-addons
          @input="setStyle"
        />
      </b-field>
      <b-field label="Updates Bar">
        <b-button
          size="is-small"
          @click="toggleUpdatesBar"
        >
          <b-icon
            icon="bell"
            custom-size="default"
          />
          <span>Toggle</span>
        </b-button>
      </b-field>
      <b-field label="Layout">
        <checkbox-radio-picker
          v-model="layout"
          :options="{default:'Default', expanded:'Expanded', boxed:'Boxed', wide:'Wide'}"
          no-grouped-multiline
          no-grouped
          no-addons
          @input="setLayout"
        />
      </b-field>
      <b-field
        v-if="appStyle === 'default'"
        label="Navbar color"
      >
        <checkbox-radio-picker
          v-model="navBarColor"
          :options="{default:'White', 'is-black':'Black', 'is-dark':'Dark', 'is-light':'Light'}"
          no-grouped-multiline
          no-grouped
          no-addons
          @input="setNavBarColor"
        />
      </b-field>
      <span
        class="icon is-medium close-button"
        @click="isOpen = false"
      >
        <i class="mdi mdi-24px mdi-close" />
      </span>
    </div>
  </div>
</template>

<script>
import { useStore } from '@/store'
import { computed, ref, watch } from 'vue'
import CheckboxRadioPicker from '@/components/layout/CheckboxRadioPicker.vue'

export default {
  name: 'ConfigBox',
  components: {
    CheckboxRadioPicker
  },
  setup () {
    const isOpen = ref(false)

    const style = ref('default')

    const layout = ref('default')

    const navBarColor = ref('default')

    const store = useStore()

    const isDarkModeActive = computed(() => store.state.isDarkModeActive)
    const appStyle = computed(() => store.state.appStyle)
    const isLayoutMobile = computed(() => store.state.isLayoutMobile)
    const isConfigBoxVisible = computed(() => store.state.isConfigBoxVisible)

    watch(isLayoutMobile, newVal => {
      if (newVal) {
        layout.value = 'default'
      }
    })

    const initStyle = () => {
      if (appStyle.value === 'light-dark') {
        style.value = isDarkModeActive.value ? 'dark' : 'light'
      } else {
        style.value = 'default'
      }
    }

    initStyle()

    watch(appStyle, () => {
      initStyle()
    })

    const setStyle = styleKey => {
      let query = null

      if (['light', 'dark'].indexOf(styleKey) > -1) {
        if (appStyle.value === 'light-dark') {
          store.commit('darkModeToggle', styleKey === 'dark')
        } else {
          query = 'style=light-dark'

          if (styleKey === 'dark') {
            query += '-dark'
          }

          if (window.location.search.indexOf('?') === 0) {
            query = `${window.location.search}&${query}`
          } else {
            query = `?${query}`
          }
        }
      } else {
        const urlLastEtPosition = window.location.search.lastIndexOf('&')

        query = urlLastEtPosition > -1 ? window.location.search.substring(0, urlLastEtPosition) : ''
      }

      if (query !== null) {
        window.location.href = `${window.location.origin}/${query}${window.location.hash}`
      }
    }

    const setLayout = layout => {
      store.commit('layoutBoxedToggle', false)
      store.commit('asideRightToggle', false)
      store.commit('overlayToggle', false)
      document.documentElement.classList.remove('has-aside-right')

      if (layout === 'default') {
        store.commit('asideStateToggle', false)
      } else if (layout === 'expanded') {
        store.commit('asideStateToggle', true)
      } else if (layout === 'boxed') {
        store.commit('layoutBoxedToggle', true)
      } else if (layout === 'wide') {
        store.commit('layoutWideToggle', true)
      }
    }

    const setNavBarColor = color => {
      store.commit('setNavBarColor', color !== 'default' ? color : null)
    }

    const toggleUpdatesBar = () => {
      store.dispatch('asideRightToggle')
    }

    return {
      isOpen,
      style,
      layout,
      navBarColor,
      isConfigBoxVisible,
      appStyle,
      setStyle,
      setLayout,
      setNavBarColor,
      toggleUpdatesBar
    }
  }
}
</script>
