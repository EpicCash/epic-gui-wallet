<template>
  <li :class="{'is-active':isDropdownActive}">

      <mdicon name="{{ item.icon }}" />

      <span
        v-if="item.label"
        :class="{'menu-item-label':!!item.icon}"
      >{{ item.label }}</span>

  </li>
</template>

<script>
import { computed, ref, watch } from 'vue'
import { useStore } from '@/store'

export default {
  name: 'AsideMenuItem',
  components: {

  },

  emits: ['menu-click'],
  setup (props, { emit }) {

    const item = ref({});
    const componentIs = computed(() => props.item.to ? 'router-link' : 'a')

    const isDropdownActive = ref(false)

    const hasDropdown = computed(() => !!props.item.menu)

    const dropdownIcon = computed(() => isDropdownActive.value ? 'minus' : 'plus')



    const store = useStore()

    const isAsideExpanded = computed(() => store.state.isAsideExpanded)

    const asideActiveForcedKey = computed(() => store.state.asideActiveForcedKey)

    const componentTitle = computed(() => !isAsideExpanded.value && props.item.label ? props.item.label : null)

    const componentClass = computed(() => {
      const base = []

      if (props.item.icon) {
        base.push('has-icon')
      }



      if (props.item.state) {
        base.push(`is-state-${props.item.state}`, 'is-hoverable')
      }

      if (asideActiveForcedKey.value && props.item.menuSecondaryKey && asideActiveForcedKey.value === props.item.menuSecondaryKey) {
        base.push('is-active')
      }

      return base
    })

    const componentActiveClass = computed(() => asideActiveForcedKey.value ? null : 'is-active')

    const menuClick = () => {
      emit('menu-click', props.item)

      if (hasDropdown.value) {
        isDropdownActive.value = !isDropdownActive.value

        if (!props.isSecondary) {
          store.commit('asideStateToggle', true)
        }
      }
    }

    watch(isAsideExpanded, newValue => {
      if (!newValue) {
        isDropdownActive.value = false
      }
    })

    return {
      item,
      componentIs,
      isDropdownActive,
      hasDropdown,
      dropdownIcon,
      componentTitle,
      componentClass,
      componentActiveClass,
      menuClick
    }
  }
}
</script>
