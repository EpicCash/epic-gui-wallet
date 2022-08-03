<template>
  <article
    v-if="!isDismissed"
    class="media"
    :class="{'has-media-left':item.avatar}"
  >
    <figure
      v-if="item.avatar"
      class="media-left"
    >
      <p class="image is-64x64">
        <img
          :src="item.avatar"
          class="is-rounded"
        >
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <p class="media-meta">
          <strong>{{ item.name }}</strong>
          <small v-if="item.login">@{{ item.login }}</small>
          <small class="has-text-grey">{{ item.ago }}</small>
        </p>
        <p>
          {{ item.text }}
        </p>
      </div>
      <nav
        v-if="hasShareButtons"
        class="level is-mobile"
      >
        <div class="level-left">
          <a class="level-item">
            <b-icon
              icon="reply"
              custom-size="default"
            />
          </a>
          <a class="level-item">
            <b-icon
              icon="twitter-retweet"
              custom-size="default"
            />
          </a>
          <a class="level-item">
            <b-icon
              icon="heart-outline"
              custom-size="default"
            />
          </a>
        </div>
      </nav>
    </div>
    <div
      v-if="hasDismiss"
      class="media-right"
      @click="dismiss"
    >
      <button class="delete" />
    </div>
  </article>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'MediaItem',
  props: {
    item: {
      type: Object,
      default: () => {}
    },
    hasShareButtons: Boolean,
    hasDismiss: Boolean
  },
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
