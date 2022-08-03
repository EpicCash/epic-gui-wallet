<template>
  <div class="modal"
    v-bind:class="{'is-active': isModalActive}"
  >
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          Wallet first scan
        </p>
        <button
          type="button"
          class="delete"
          @click="cancel"
        />
      </header>
      <section class="modal-card-body">
        <p class="is-size-7" v-for="output in outputData" :key="output">{{ output }}</p>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="cancel">
          Ok
        </button>

      </footer>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'FirstsyncModalBox',
  props: {
    isActive: Boolean,
    outputData: {
      type: Array,
      default: null
    }
  },
  emits: ['cancel', 'confirm'],
  setup (props, { emit }) {
    const isModalActive = computed({
      get: () => props.isActive,
      set: value => {
        if (!value) {
          cancel()
        }
      }
    })

    const confirm = () => {
      emit('confirm')
    }

    const cancel = () => {
      emit('cancel')
    }

    return {
      isModalActive,
      confirm,
      cancel
    }
  }
}
</script>
