<template>


    <section class="section is-main-section" >


        <NodeserverField ref="nodeserverField" />



        <div class="field">

          <label class="label">{{ $t("msg.lang.lang") }}</label>
          <div class="control">
            <div class="select">
              <select v-model="localeSelected">
                <option v-for="(lang, locale) in langs" :value="locale" :key="lang">{{lang}}</option>
              </select>
            </div>
          </div>
        </div>


        <div class="field">
          <div class="control">
            <button class="button is-primary" @click="save" >{{ $t("msg.save") }}</button>
          </div>

        </div>
    </section>


</template>
<script>

import { ref } from 'vue';

import { useStore } from '@/store';
import NodeserverField from "@/components/form/nodeserverField";
import useFormValidation from "@/modules/useFormValidation";


  export default {
    name: "settings",
    components: {
      NodeserverField
    },
    setup(){

      const { resetFormErrors } = useFormValidation();
      const nodeserverField = ref('');
      const store = useStore();
      const locale = ref('en');
      const localeSelected = ref('en');
      const langs = ref([]);
      const check_node_api_http_addr = ref('');
      const walletlisten_on_startup = ref(false);

      return{
        store,
        nodeserverField,
        resetFormErrors,
        locale,
        localeSelected,
        langs,
        check_node_api_http_addr,
        walletlisten_on_startup
      }
    },

    mounted(){

      this.nodeserverField.select = !this.store.state.user.nodeInternal ? 'external' : 'internal';
      this.locale = this.configService.config['locale'];
      this.localeSelected = this.configService.config['locale'];
      this.langs = this.configService.langs;
      this.walletlisten_on_startup = this.configService.config['walletlisten_on_startup'];
      this.nodeserverField.input = this.configService.config['check_node_api_http_addr'];

    },

    methods: {

      async save(){

        this.resetFormErrors();
        let isFormAllValid = [];

        isFormAllValid.push(this.nodeserverField.validInput());

        if(!isFormAllValid.includes(false)){

          this.configService.updateConfig({

            check_node_api_http_addr: this.nodeserverField.defaultValue,
            locale: this.localeSelected,
            walletlisten_on_startup: this.walletlisten_on_startup

          });
          this.configService.checkTomlFile();

          let updated = false;

          if(this.nodeserverField.select == 'external'){
            updated = await this.$userService.updateUserByAccount(this.configService.configAccount, {nodeInternal:false});
          }else{
            updated = await this.$userService.updateUserByAccount(this.configService.configAccount, {nodeInternal:true});
          }

          /*todo simple node restart user update wallet restart here*/
          if(updated){
            //load account else wizard
            let user = await this.$userService.getUser(this.configService.configAccount);

            if(user.length){
              this.store.commit('user', user[0]);
            }
            this.store.commit('nodeType', this.nodeserverField.select);
            this.$toast.success('Settings saved');
            this.emitter.emit('app.nodeStart');
          }else{
            this.$toast.error('Error saving settings');
          }



        }else{
          return;
        }

      },

    }
  }
</script>
