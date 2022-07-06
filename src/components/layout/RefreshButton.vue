<template>
  <b-button
    native-type="button"
    class="button is-small"
    :class="{'is-loading':isLoading}"
    @click.prevent="click"
  >
    <b-icon
      :icon="icon"
      custom-size="default"
    />
    <span>{{ label }}</span>
  </b-button>
</template>

<script>
export default {
  name: 'RefreshButton',
  props: {
    icon: {
      type: String,
      default: 'refresh'
    },
    label: {
      type: String,
      default: 'Refresh'
    },
    isLoading: Boolean
  },
  emits: ['button-click'],
  setup (props, { emit }) {
    const click = e => {
      emit('button-click', e)
    }

    return {
      click
    }
  }
}
</script>
