<template>
  <section class="section is-main-section" id="aboutPage">

      <h1 class="is-size-5">Epic Cash desktop wallet</h1>
      <p>
        <i>This software is developed by <a @click="open('https://www.eccence.digital')" >eccence.digital - freiwald & Hahn GbR</a></i><br/>
        <br/>

      </p>
      <h1 class="is-size-5">GitHub:</h1>
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
      <a @click="open('https://epic.tech/community/')" >https://epic.tech/community/</a>
    </p>

  </section>

</template>

<script>

  export default {
    name: 'about',
    methods: {
      open (link) {
        window.openlink.open(link);
      }
    }
}

</script>
