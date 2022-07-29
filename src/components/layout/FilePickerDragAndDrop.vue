<template>
  <div>
    <b-field>
      <b-upload
        v-model="dropFiles"
        multiple
        drag-drop
      >
        <section class="section">
          <div class="content has-text-centered">
            <p>
              <b-icon
                icon="upload"
                size="is-large"
              />
            </p>
            <p>Drop your files here or click to upload</p>
          </div>
        </section>
      </b-upload>
    </b-field>
    <div
      v-show="dropFiles.length"
      class="upload-file-list"
    >
      <div
        v-for="(file, index) in dropFiles"
        :key="index"
        class="notification"
      >
        <div class="level">
          <div class="level-left">
            <div class="level-item">
              <div>
                <b-icon
                  icon="cloud-upload"
                  custom-size="default"
                />
                <span>{{ file.name }}</span>
              </div>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <a
                class="tag is-delete"
                @click.prevent="deleteDropFile(index)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'FilePickerDragAndDrop',
  setup () {
    const dropFiles = ref([])

    const deleteDropFile = index => {
      dropFiles.value.splice(index, 1)
    }

    return {
      dropFiles,
      deleteDropFile
    }
  }
}
</script>
