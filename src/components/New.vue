<template>

  <section class="section hero is-fullheight">
      <section class="hero">
        <div class="hero-body">

        <div class="container">

          <div class="columns is-centered">
            <div class="column is-three-quarters">
              <div class="card has-card-header-background">
                <header class="card-header" style="justify-content: center;">
                  <img src="../assets/img/epiccash-brand-full.png" style="width: 190px; padding: 16px 0px;">
                </header>
                <div class="card-content">

                      <h1 class="title has-text-centered">{{ $t('msg.welcome') }}</h1>
                      <div class="buttons is-justify-content-center">
                        <a class="button is-link is-outlined" @click="select">{{ $t("msg.new.select") }}</a>

                        <router-link class="button is-outlined is-primary" :to="{name:'create', params:{from:'new'}}">
                          {{ $t("msg.new.create") }}
                        </router-link>
                        <router-link class="button is-outlined is-primary" :to="{name:'restore', params:{from:'new'}}">
                          {{ $t("msg.new.restore") }}
                        </router-link>

                      </div>
                      <p class="has-text-danger has-text-centered" v-if="error">{{ errMsg }}</p>

                    </div>
                  </div>
                </div>
              </div>
        </div>


</div>
</section>
</section>




</template>


<script>

import { ref } from 'vue';
import { useRouter } from '@/router';
import { useStore } from '@/store';

export default {
  name: "new",
  setup() {

    const store = useStore();
    const router = useRouter();
    const error = ref(false);
    const errMsg = ref('');
    const userHomedir = ref('');
    return {
      store,
      router,
      error,
      errMsg,
      userHomedir


    }

  },
  methods: {


    async select(){

        let customHomedir = await window.api.showOpenDialog();

        if(customHomedir.canceled == false){

          this.userHomedir = customHomedir.filePaths[0];
          if(this.userHomedir){

            let haswallet = await this.configService.walletDirExist(this.userHomedir);

            if(!haswallet){
              this.error = 1;
              this.errMsg = this.$t("msg.new.selectErr");
            }else{
              this.$router.push('/login');
            }

          }

        }

    }
  }


}
</script>
