<template>


    <section class="section is-main-section">

      <div class="card">
        <header class="card-header">
          <p class="card-header-title">
            <span class="icon">
              <mdicon name="cloud-upload" />
            </span>
            &nbsp;<span>{{ $t("msg.finalize.dragdrop") }}</span>
          </p><!---->
        </header>
        <div class="card-content">


          <div v-show="!isSent" id="filebox" @dragover.prevent="isDragOver=true" @dragleave.prevent="isDragOver=false" @drop.prevent="drop">
            <div class="field"><!---->
              <label class="upload control">
                <div class="upload-draggable is-primary" v-bind:class="{'is-hovered':isDragOver}">
                  <section class="section">
                    <div class="content has-text-centered">
                      <p>
                        <span class="icon is-large">
                          <mdicon name="upload" size="48" />
                        </span>
                      </p>
                      <p>{{ $t("msg.finalize.dropMsg") }}</p>
                    </div>
                  </section>
                </div>
                <input type="file" @change="drop">

              </label><!---->
            </div>
            <div class="upload-file-list" style="display: none;"></div>
          </div>
          <div v-show="isSent">

            <div class="notification is-primary" >
              {{ $t("msg.finalize.success") }}
            </div>


            <div v-show="isSending">
              <p class="is-size-5">{{ $t("msg.finalize.sending") }}</p>
              <br/>
              <progress class="progress is-link" max="100"></progress>
            </div>

          </div>



      </div><!---->
    </div>




    </section>



</template>
<script>
const fs = window.nodeFs;

import { ref } from 'vue';
import { useStore } from '@/store';

export default {
  name: "finalize",
  setup(){

    const store = useStore();
    const isDragOver =ref(false);
    const isSent =ref(false);
    const isSending =ref(false);

    return {
      store,
      isDragOver,
      isSent,
      isSending

    }

  },

  methods: {


    drop(event){

      let fn = '';
      if(event.dataTransfer){
         fn = event.dataTransfer.files[0];
      }else{
         fn = event.target.files[0];
      }

      if(this.fileTypeIsSupported(fn)){

        let tx_id
        let content

        try{
          content = fs.readFileSync(fn.path, {
            encoding: "utf8",
            flag: "r"
          });

          let data = {};
          try{
            data = JSON.parse(content);
          }catch(e){

            this.store.commit('updates', {
              "status": "is-danger",
              "text": e,
              "icon": "information"
            });
            this.$toast.error(this.$t('msg.finalize.error_read'));
            return;
          }

          tx_id = data.id

        }catch(e){
          window.debug ? console.log('read tx file error:' + e) : null;
          this.store.commit('updates', {
            "status": "is-danger",
            "text": e,
            "icon": "information"
          });
          this.$toast.error(this.$t('msg.finalize.WrongFileType'));
          return
        }

        this.isSending = true
        let send = async function(){

          let res = await this.$walletService.finalizeTransaction(JSON.parse(content));

          if(res && res.result && res.result.Ok){
            //TODO: implement fluff true/false (Dandelion)
            let tx = res.result.Ok.tx;
            let res2 = await this.$walletService.postTransaction(tx);
            if(res2 && res2.result && res2.result.Ok == null ){
              this.isSent = true
              tx_id = res.result.Ok;

            }else{
              this.$toast.error(res2.error.message);
            }

          }else{

            this.$toast.error(res.error.message);
          }


          this.isSending = false;
          this.emitter.emit('app.update');

        }
        send.call(this)

      }else{
        this.$toast.error(this.$t('msg.finalize.WrongFileType'));

      }

    },
    clearup(){
      this.isDragOver = false
      this.isSent = false
      this.isSending= false
    },
    fileTypeIsSupported(file){

      if( !file.type || file.type.search('text')!=-1 ||	file.type.search('json')!=-1){
        return true
      }else{
        return false
      }
    }
  }
}
</script>
