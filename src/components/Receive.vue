<template>


      <section class="section is-main-section">

        <div class="card">
          <header class="card-header">
            <p class="card-header-title">
              <span class="icon">
                <mdicon name="cloud-upload" />
              </span>
              &nbsp;<span>{{ $t("msg.receive.dragdrop") }}</span>
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
                        <p>{{ $t("msg.receive.dropMsg") }}</p>
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
                {{ $t("msg.receive.success") }}
              </div>

            </div>



        </div><!---->
      </div>

    </section>

</template>
<script>

const fs = window.nodeFs;
const path = window.nodePath;

import { ref } from 'vue';
import { useStore } from '@/store';

export default {
  name: "receive",

  setup(){

    const store = useStore();
    const isDragOver =ref(false);
    const isSent =ref(false);


    return {
      store,
      isDragOver,
      isSent

    }

  },
  methods: {

    async drop(event){
      let fn = '';
      if(event.dataTransfer){
         fn = event.dataTransfer.files[0];
      }else{
         fn = event.target.files[0];
      }

      if(this.fileTypeIsSupported(fn)){
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
            this.$toast.error(this.$t('msg.receive.error_read'));
            return;
          }

        }catch(e){

          this.store.commit('updates', {
            "status": "is-danger",
            "text": e,
            "icon": "information"
          });
          this.$toast.error(this.$t('msg.receive.WrongFileType'));
          return
        }


        let fn_output = await window.api.showSaveDialog(this.$t('msg.save'), this.$t('msg.fileSend.saveMsg'), 'finalize_' + fn.name);

        if(fn_output){

          this.$walletService.receiveTransaction(JSON.parse(content), null, null)
              .then( (res) => {
                let data = res.data.result;

                if(data.Ok){

                  fs.writeFileSync(fn_output.filePath, JSON.stringify(data.Ok), {
                    encoding: "utf8",
                    flag: "w"
                  });

                  this.isSent = true
                  this.emitter.emit('app.update');

                }else if(data.Err){
                  this.$toast.error(data.Err);
                }

              }).catch((error) => {

                if (error.response) {
                  let resp = error.response

                }

                this.$toast.error(this.$t('msg.receive.CreateFailed'));
              })
        }else{

          this.$toast.error(this.$t('msg.receive.NoSavePlace'));
        }
      }
      else{
        this.$toast.error(this.$t('msg.receive.WrongFileType'));

      }
    },
    clearup(){
      this.isDragOver = false
      this.isSent = false
    },
    fileTypeIsSupported(file){
      if( !file.type || file.type.search('text')!=-1 ||	 file.type.search('json')!=-1){
        return true
      }else{
        return false
      }
    },
  }
}
</script>
