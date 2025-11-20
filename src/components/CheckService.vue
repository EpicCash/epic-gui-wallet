<template>

  <section class="section" >
    <!-- can be a check list -->
  </section>

</template>

<script>

  import { inject } from 'vue'

  export default {
    name: 'checkService',
    setup(){
      const emitter = inject('emitter');
      return {
        emitter
      }
    },
    created(){

      this.emitter.on('checkSuccess', (msg) => {
        window.debug ? console.log('checkService success: ', msg) : null;

      });

      this.emitter.on('checkFail', (msg) => {
        window.debug ? console.log('checkService error: ', msg) : null;

      });
    },
  }
</script>
