<template>
  <login v-if="walletExist"></login>
  <new v-else></new>
</template>

<script>
  import Login from './Login.vue'
  import New from './New.vue'

  export default {
    name: 'landing',
    components: {
      Login,
      New
    },
    props: {
      walletExist: {
        type: Boolean,
        default: false
      },
      nodeOnline:{
        type: Boolean,
        default: false
      }

    },
}
</script>

<style>
</style>
