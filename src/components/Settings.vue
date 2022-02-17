<template>

<div class="modal" :class="{'is-active': showModal}">
  <div class="modal-background" @click="closeModal"></div>
  <div class="modal-card" style="width:300px">
    <header class="modal-card-head">
      <p class="modal-card-title is-size-4 has-text-link has-text-weight-semibold">{{ $t("msg.settings.title") }}</p>
      <button class="delete" aria-label="close" @click="closeModal"></button>
    </header>
    <section class="modal-card-body" style="height:200px;background-color: whitesmoke;">

here wallet settings

    </section>
  </div>
</div>

</template>
<script>


  export default {
    name: "settings",
    props: {
      showModal: {
        type: Boolean,
        default: false
      }
    },
    
    methods: {
      closeModal() {
        this.emitter.emit('close', 'windowSettings');
      }
    }
  }
</script>
<style>
</style>
