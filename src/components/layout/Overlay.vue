<template>
  <div
    v-if="isOverlayVisible"
    class="ui-overlay"
    :class="{'off-navbar':isLayoutAsideHidden}"
    @click="click"
  />
</template>

<script>
import { useStore } from '@/store'
import { computed } from 'vue'

export default {
  name: 'Overlay',
  emits: ['overlay-click'],
  setup (props, { emit }) {
    const store = useStore()

    const isOverlayVisible = computed(() => store.state.isOverlayVisible)
    const isLayoutAsideHidden = computed(() => store.state.isLayoutAsideHidden)

    const click = () => {
      emit('overlay-click')
    }

    return {
      isOverlayVisible,
      isLayoutAsideHidden,
      click
    }
  }
}
</script>
