<template>
  <div class="modal"
    v-bind:class="{'is-active': isModalActive}"
  >
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          Confirm action
        </p>
        <button
          type="button"
          class="delete"
          @click="cancel"
        />
      </header>
      <section class="modal-card-body">
        Your internal node is now synced and can be used by the app.<br/>
        Restart App now?
      </section>
      <footer class="modal-card-foot">
        <button class="button is-danger" @click="cancel">
          Cancel
        </button>
        <button class="button is-success" @click="confirm">
          Ok
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'NodesyncedModalBox',
  props: {
    isActive: Boolean,

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
