<template>
<p></p>
</template>

<script>
import { computed } from 'vue'
import { useStore } from '@/store'

export default {
  name: 'UserAvatar',
  props: {
    avatar: {
      type: String,
      default: null
    }
  },
  setup (props) {
    const store = useStore()

    const newAvatar = computed(() => props.avatar ? props.avatar : store.state.userAvatar)

    return {
      newAvatar
    }
  }
}
</script>
