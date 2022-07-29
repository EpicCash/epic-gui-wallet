<template>
  <div
    class="aside-tools"
    :class="{'has-icon':!!icon}"
  >
    <div class="aside-tools-label">

      <mdicon name="icon" />
      <slot />
    </div>
    <a
      v-if="hasClose"
      class="aside-close"
      @click="close"
    >
      
      <mdicon name="close" />
    </a>
  </div>
</template>

<script>
export default {
  name: 'AsideTools',
  props: {
    icon: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    hasClose: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close'],
  setup (props, { emit }) {
    const close = () => {
      emit('close')
    }

    return {
      close
    }
  }
}
</script>
