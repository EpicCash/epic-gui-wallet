<template>
  <div
    v-if="!isDismissed"
    class="notification"
  >
    <div class="level">
      <div class="level-left">
        <div class="level-item">
          <slot />
        </div>
      </div>
      <div class="level-right">
        <b-button
          native-type="button"
          type="is-white"
          size="is-small"
          @click="dismiss"
        >
          Dismiss
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Notification',
  setup (props) {
    const isDismissed = ref(false)

    const dismiss = () => {
      isDismissed.value = true


    }

    return {
      isDismissed,
      dismiss
    }
  }
}
</script>
