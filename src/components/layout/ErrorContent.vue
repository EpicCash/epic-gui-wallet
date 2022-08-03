<template>
  <div>
    <div class="error-page-icon">
      <b-icon
        icon="power-plug"
        custom-size="default"
      />
    </div>
    <div class="error-page-caption">
      <h1>Sample error</h1>
    </div>
    <div class="error-page-action">
      <div class="buttons is-centered">
        <b-button
          native-type="button"
          type="is-info"
          @click="emitGoBack"
        >
          Go Back
        </b-button>
        <slot name="buttons" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ErrorContent',
  props: {
    icon: {
      type: String,
      default: 'power-plug'
    },
    title: {
      type: String,
      default: 'Error'
    }
  },
  emits: ['go-back'],
  setup (props, { emit }) {
    const emitGoBack = () => {
      emit('go-back')
    }

    return {
      emitGoBack
    }
  }
}
</script>
