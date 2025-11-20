<template>
  <section class="section is-main-section" id="aboutPage">

      <h1 class="is-size-5">Epic Cash desktop wallet  &#8212; v6.0.0</h1>
      <p>

        <br/>

      </p>
      <h1 class="is-size-5">GitHub source:</h1>
      <p>
      <a @click="open('https://github.com/EpicCash/epic-gui-wallet')" >https://github.com/EpicCash/epic-gui-wallet</a>
      <br/>
      <br/>
      </p>
        <h1 class="is-size-5">Thank you:</h1>
      <p>
        We would like to thank everyone who helped testing this product and support us in the development process.<br/>
        <br/>
      </p>
      <br/>
    <h1 class="is-size-5">Epic Cash Community:</h1>
    <p>
      Learn more about Epic Cash, ask questions and connect with fellow enthusiasts on our social media.<br/>
      <a @click="open('https://epiccash.com/')" >https://epiccash.com/</a>
    </p>

  </section>

</template>

<script>

  import { ref,onMounted } from 'vue';

  export default {
    name: 'about',
    setup(){

      const version = ref('');

      return {
        version,

      }
    },
    async mounted(){
      this.version = await window.api.version();

   
    },
    methods: {
      open (link) {
        window.openlink.open(link);
      }

    }
}

</script>
