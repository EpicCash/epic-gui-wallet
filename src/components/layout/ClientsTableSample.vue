<template>
  <div>
    <modal-box
      :is-active="isModalActive"
      :trash-object-name="trashObject ? trashObject.name : null "
      @confirm="trashConfirm"
      @cancel="trashCancel"
    />
    <b-table
      v-model="checkedRows"
      :checkable="checkable"
      :paginated="paginated"
      :per-page="perPage"
      :data="clients"
      default-sort="name"
      striped
      hoverable
    >

        <div class="image">
          <img
            :src="props.row.avatar"
            class="is-rounded"
          >
        </div>


        {{ props.row.name }}


        {{ props.row.company }}


        {{ props.row.city }}


        <progress
          class="progress is-small is-primary"
          :value="props.row.progress"
          max="100"
        >
          {{ props.row.progress }}
        </progress>


        <small
          class="has-text-grey is-abbr-like"
          :title="props.row.created"
        >{{ props.row.created }}</small>


        <div class="buttons is-right no-wrap">
          <router-link
            :to="{name:'client.edit', params: {id: props.row.id}}"
            class="button is-small is-primary"
          >
            <b-icon
              icon="account-edit"
              size="is-small"
            />
          </router-link>
          <b-button
            native-type="button"
            type="is-danger"
            size="is-small"
            @click.prevent="trashModalOpen(props.row)"
          >
            <b-icon
              icon="trash-can"
              size="is-small"
            />
          </b-button>
        </div>



        <div class="content has-text-grey has-text-centered">
          <p>
            <b-icon
              icon="emoticon-sad"
              size="is-large"
            />
          </p>
          <p>Nothing's here&hellip;</p>
        </div>

    </b-table>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from '@/store'
import ModalBox from '@/components/layout/ModalBox.vue'

export default {
  name: 'ClientsTableSample',
  components: { ModalBox },
  props: {
    checkable: Boolean,
    isEmpty: Boolean
  },
  setup (props) {
    const store = useStore()

    const clients = computed(() => props.isEmpty ? [] : store.state.clients)

    const perPage = ref(10)

    const paginated = computed(() => clients.value.length > perPage.value)

    const checkedRows = ref([])

    const isModalActive = ref(false)

    const trashObject = ref(null)

    const trashModalOpen = obj => {
      trashObject.value = obj
      isModalActive.value = true
    }

    const trashConfirm = () => {
      isModalActive.value = false


    }

    const trashCancel = () => {
      isModalActive.value = false
    }

    return {
      clients,
      perPage,
      paginated,
      checkedRows,
      isModalActive,
      trashObject,
      trashModalOpen,
      trashConfirm,
      trashCancel
    }
  }
}
</script>
