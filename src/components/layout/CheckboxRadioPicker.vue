<template>
  <b-field
    :grouped="!noGrouped"
    :group-multiline="!noGroupedMultiline"
    :addons="!noAddons"
  >
    <div
      v-for="(v, k) in options"
      :key="k"
      class="control"
    >
      <component
        :is="componentIs"
        v-model="newValue"
        :native-value="k"
        :type="type"
      >
        {{ v }}
      </component>
    </div>
  </b-field>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'CheckboxRadioPicker',
  props: {
    options: {
      type: Object,
      default: null
    },
    type: {
      type: String,
      default: null
    },
    value: {
      type: [String, Number, Array],
      default: null
    },
    noGrouped: Boolean,
    noGroupedMultiline: Boolean,
    noAddons: Boolean
  },
  emits: ['input'],
  setup (props, { emit }) {
    const newValue = computed({
      get: () => props.value,
      set: value => {
        emit('input', value)
      }
    })

    const componentIs = computed(() => typeof props.value === 'object' ? 'b-checkbox' : 'b-radio')

    return {
      newValue,
      componentIs
    }
  }
}
</script>
