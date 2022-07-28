<template>
  <card-component
    title="Change Password"
    icon="lock"
  >
    <form @submit.prevent="submit">
      <b-field
        horizontal
        label="Current password"
        message="Required. Your current password"
      >
        <b-input
          v-model="form.password_current"
          name="password_current"
          type="password"
          required
          autcomplete="current-password"
        />
      </b-field>
      <hr>
      <b-field
        horizontal
        label="New password"
        message="Required. New password"
      >
        <b-input
          v-model="form.password"
          name="password"
          type="password"
          required
          autocomplete="new-password"
        />
      </b-field>
      <b-field
        horizontal
        label="Confirm password"
        message="Required. New password one more time"
      >
        <b-input
          v-model="form.password_confirmation"
          name="password_confirmation"
          type="password"
          required
          autocomplete="new-password"
        />
      </b-field>
      <hr>
      <b-field horizontal>
        <div class="control">
          <b-button
            native-type="submit"
            type="is-info"
            :loading="isLoading"
          >
            Submit
          </b-button>
        </div>
      </b-field>
    </form>
  </card-component>
</template>

<script>
import { reactive, ref } from 'vue'
import CardComponent from '@/components/layout/CardComponent.vue'

export default {
  name: 'PasswordUpdateForm',
  components: {
    CardComponent
  },
  setup (props) {
    const isLoading = ref(false)

    const form = reactive({
      password_current: null,
      password: null,
      password_confirmation: null
    })

    const submit = () => {
      isLoading.value = true

      setTimeout(() => {
        isLoading.value = false


      }, 750)
    }

    return {
      isLoading,
      form,
      submit
    }
  }
}
</script>
