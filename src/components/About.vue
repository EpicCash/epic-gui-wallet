<template>
  <section class="section is-main-section" id="aboutPage">

      <h1 class="is-size-5">Epic Cash desktop wallet  &#8212; v5.3.0</h1>
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
      <h1 class="is-size-5">Donations:</h1>
      <p>Vitex Wallet Address<br/>
      <code>vite_aaac001cda9bd8e153789edefb6dc9a99ca6c37adc122692e9</code><br/>
      <br/>
      Optional HTTPS transfer address for Epic Cash transfers<br/>
      <code>https://gateway.vgate.io/gateway/epic-deposit/vite_aaac001cda9bd8e153789edefb6dc9a99ca6c37adc122692e9-20656</code>
      <br/>
      <br/>
    </p>
    <h1 class="is-size-5">Epic Cash Community:</h1>
    <p>
      Learn more about Epic Cash, ask questions and connect with fellow enthusiasts on our social media.<br/>
      <a @click="open('https://epiccash.com/')" >https://epiccash.com/</a>
    </p>

  </section>

</template>

<script>

  import { useStore } from '@/store';

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

    //  console.log(this.configService);
    },
    methods: {
      open (link) {
        window.openlink.open(link);
      }

    }
}

</script>
