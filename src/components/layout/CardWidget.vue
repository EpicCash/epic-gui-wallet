<template>
  <card-component
    class="is-card-widget"
    :icon="trendingIcon"
    has-button-slot
    has-title-slot
  >


    <button native-type="button"
    size="is-small"
    @click="buttonClick" />
      <b-icon
        icon="settings"
        custom-size="default"
      />

    <div class="level is-mobile">
      <div class="level-item">
        <div class="is-widget-label">
          <h3 class="subtitle is-spaced">
            {{ label }}
          </h3>
          <h1 class="title">
            <growing-number
              :value="number"
              :prefix="prefix"
              :suffix="suffix"
            />
          </h1>
        </div>
      </div>
      <div
        v-if="icon"
        class="level-item has-widget-icon"
      >
        <div class="is-widget-icon">
          <b-icon
            :icon="icon"
            size="is-large"
            :type="type"
          />
        </div>
      </div>
    </div>
  </card-component>
</template>

<script>
import numeral from 'numeral'
import { computed } from 'vue'
import CardComponent from '@/components/layout/CardComponent.vue'
import GrowingNumber from '@/components/layout/GrowingNumber.vue'

export default {
  name: 'CardWidget',
  components: { GrowingNumber, CardComponent },
  props: {
    icon: {
      type: String,
      default: null
    },
    number: {
      type: Number,
      default: 0
    },
    prefix: {
      type: String,
      default: null
    },
    suffix: {
      type: String,
      default: null
    },
    label: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: null
    },
    previousNumber: {
      type: Number,
      default: 0
    },
    previousPeriod: {
      type: String,
      default: null
    }
  },
  setup (props) {
    const trendingIcon = computed(() => props.previousNumber < props.number ? 'arrow-up-bold' : 'arrow-down-bold')

    const previousValue = computed(() => {
      let valueString = (props.previousNumber < 1000) ? props.previousNumber : numeral(props.previousNumber).format('0,0')

      if (props.prefix) {
        valueString = props.prefix + valueString
      }

      if (props.suffix) {
        valueString += props.suffix
      }

      return valueString
    })

    const buttonClick = () => {

    }

    return {
      trendingIcon,
      previousValue,
      buttonClick
    }
  }
}
</script>
