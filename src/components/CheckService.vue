<template>

  <section class="section" >
    <!-- can be a check list -->
  </section>

</template>

<script>

  export default {
    name: 'checkService',
    created(){

      this.emitter.on('checkSuccess', (msg) => {
        console.log('checkService success: ', msg);

      });

      this.emitter.on('checkFail', (msg) => {
        console.log('checkService error: ', msg);

      });
    },
  }
</script>
