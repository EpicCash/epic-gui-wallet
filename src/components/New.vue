<template>
  <section class="hero" >
    <div class="hero-body">
      <div class="container">


        <div class="columns is-centered">

          <div class="column is-8" >
            <div class="columns is-centered is-multiline">
                <img src="../assets/epiccash_logo.png" style="width:30%;height:auto;">

            </div>
            <p>&nbsp;</p>

            <h1 class="title has-text-centered">{{ $t('msg.welcome') }}</h1>
              
              <div class="box">
                <div class="field is-grouped">
                  <div class="control">
                    <a class="button is-link is-outlined" @click="create">{{ $t("msg.new.create") }}</a>
                  </div>

                  <div class="control">
                    <a class="button is-link is-outlined" @click="restore">{{ $t("msg.new.restore") }}</a>
                  </div>

                </div>
              </div>



          </div>

        </div>


      </div>
    </div>
  </section>
</template>


<script>


export default {
  name: "new",
  data() {
    return {

    }
  },
  methods: {
    create(){
      console.log('new create');
      this.emitter.emit('initMode', 'create');
    },
    restore(){
      console.log('new restore');
      this.emitter.emit('initMode', 'restore');

    }
  }


}
</script>
<style>

</style>
