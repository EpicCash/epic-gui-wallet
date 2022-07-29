<template>
  <card-component
    :title="title"
    :icon="icon"
    is-scrollable
    has-button-slot
    has-footer-slot
  >




        <b-icon
          v-if="status.labelIcon"
          :icon="status.labelIcon"
          custom-size="default"
        />
        <span v-if="status.label">{{ status.label }}</span>



    <div class="media-list">
      <b-loading
        :is-full-page="false"
        :active="isLoading"
      />
      <media-item
        v-for="item in items"
        :key="item.id"
        :item="item"
        :has-share-buttons="hasShareButtons"
        :has-dismiss="hasDismiss"
      />
    </div>


      <a

        class="card-footer-item"
        @click.prevent="delayedFetch"
      >

      <b-icon
        icon="autorenew"
        custom-size="default"
      />
      <span>Load more</span>
    </a>

  </card-component>
</template>

<script>
import axios from 'axios'
import { ref } from 'vue'
import CardComponent from '@/components/layout/CardComponent.vue'
//import CardToolbar from '@/components/layout/CardToolbar.vue'
import MediaItem from '@/components/layout/MediaItem.vue'
//import RefreshButton from '@/components/layout/RefreshButton.vue'

export default {
  name: 'CardScrollable',
  components: { MediaItem, CardComponent },
  props: {
    title: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    dataUrl: {
      type: String,
      required: true
    },
    hasShareButtons: Boolean,
    hasDismiss: Boolean
  },
  setup (props) {
    const isLoading = ref(false)
    const items = ref([])
    const status = ref({})

    const fetchData = () => {
      isLoading.value = true

      items.value = []

      status.value = {
        text: 'Fetching data...',
        labelClass: 'is-info',
        labelIcon: 'shuffle-variant'
      }

      axios
        .get(props.dataUrl)
        .then(r => {
          isLoading.value = false

          if (r.data) {
            if (r.data.data) {
              items.value = r.data.data
            }
            if (r.data.status) {
              status.value = r.data.status
            }
          }
        })
        .catch(e => {
          isLoading.value = false


        })
    }

    fetchData()

    /*
    * This is an imitation, to show the loading state
    * We delay for 500ms
    * */
    const delayedFetch = () => {
      isLoading.value = true

      items.value = []

      status.value = {
        text: 'Fetching data...',
        labelClass: 'is-info',
        labelIcon: 'shuffle-variant'
      }

      setTimeout(() => {
        fetchData()
      }, 500)
    }

    return {
      isLoading,
      items,
      status,
      fetchData,
      delayedFetch
    }
  }
}
</script>
