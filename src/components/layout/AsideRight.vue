<template>
  <aside
    v-show="isAsideRightVisible || !isLayoutAsideHidden"
    class="aside is-placed-right"
  >
    <div
      ref="container"
      class="aside-container"
    >
      <div>
        <aside-updates-item
          v-for="item in items"
          :key="item.id"
          :status="item.status"
          :icon="item.icon"
        >
          <p style="word-break:break-all">{{ item.text }}</p>
        </aside-updates-item>
      </div>
    </div>
  </aside>
</template>

<script>
import { useStore } from '@/store'
import { computed } from 'vue'
import AsideUpdatesItem from '@/components/layout/AsideUpdatesItem.vue'

export default {
  name: 'AsideRight',
  components: { AsideUpdatesItem },
  setup () {
    const store = useStore()

    const items = computed(() => store.state.updates)

    const isAsideRightVisible = computed(() => store.state.isAsideRightVisible)
    const isLayoutAsideHidden = computed(() => store.state.isLayoutAsideHidden)

    return {
      items,
      isAsideRightVisible,
      isLayoutAsideHidden
    }
  }
}
</script>
