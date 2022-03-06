<template>
  <section class="hero is-fullheight" style="background: black">
    <div class="hero-body">
      <div class="container ">
        <div class="columns is-centered is-multiline">
          <div class="block">
            <img src="../assets/logo.png" style="width:20%;height:auto;" >
            <h2 class="title" style="margin-top: 24px; margin-left:70px" >{{ $t("msg.title") }}</h2>
          </div>
        </div>
        <div class="columns is-centered">
          <div class="field is-grouped">
            <div class="control">
              <a class="button is-link is-inverted is-outlined" @click="create">{{ $t("msg.new.create") }}</a>
            </div>

            <div class="control">
              <a class="button is-link is-inverted is-outlined" @click="restore">{{ $t("msg.new.restore") }}</a>
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
