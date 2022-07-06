<template>
  <article class="media">
    <div class="media-content">
      <div class="content">
        <slot />
      </div>
      <nav class="level is-mobile">
        <div class="level-left">
          <div class="level-item">
            <span
              v-if="icon"
              class="tag is-small"
              :class="status"
            >

              <mdicon name="icon" />
            </span>
          </div>
          
        </div>
      </nav>
    </div>
  </article>
</template>

<script>
export default {
  name: 'AsideUpdatesItem',
  props: {
    icon: {
      type: String,
      default: null
    },
    status: {
      type: String,
      default: 'is-info'
    },
    ago: {
      type: String,
      default: null
    }
  }
}
</script>
