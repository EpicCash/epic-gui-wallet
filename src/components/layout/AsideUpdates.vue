<template>
  <div>
    <aside-updates-item
      v-for="item in items"
      :key="item.id"
      :status="item.status"
      :icon="item.icon"
    >
      <p>{{ item.text }}</p>
    </aside-updates-item>
  </div>
</template>

<script>
import { useStore } from '@/store'
import { computed, watch } from 'vue'
import AsideUpdatesItem from '@/components/layout/AsideUpdatesItem.vue'

export default {
  name: 'AsideUpdates',
  components: { AsideUpdatesItem },
  emits: ['data-updated'],
  setup (props, { emit }) {
    const store = useStore()

    const items = computed(() => store.state.updates)

    watch(items, () => {
      emit('data-updated')
    })

    return {
      items
    }
  }
}
</script>
