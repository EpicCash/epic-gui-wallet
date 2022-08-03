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
        <p>This will permanently delete <b>{{ trashObjectName }}</b></p>
        <p>Action can not be undone.</p>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-danger" @click="cancel">
          Cancel
        </button>
        <button class="button is-danger" @click="confirm">
          Delete
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'ModalBox',
  props: {
    isActive: Boolean,
    trashObjectName: {
      type: String,
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
