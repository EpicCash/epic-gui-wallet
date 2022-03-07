<template>

<div class="modal" :class="{'is-active': showModal}">
  <div class="modal-background" @click="closeModal"></div>
  <div class="modal-card" >
    <header class="modal-card-head">
      <p class="modal-card-title is-size-4 has-text-link has-text-weight-semibold">{{ $t("msg.receive") }}</p>
      <button class="delete" aria-label="close" @click="closeModal"></button>
    </header>
    <section class="modal-card-body" >
      <div class="notification is-warning" v-if="errors.length">
        <p v-for="error in errors" :key="error">{{ error }}</p>
      </div>
      <div class="center">
        <a class="button is-link is-outlined" v-if="errors.length" @click="clearup">{{ $t("msg.clearup") }}</a>
      </div>

      <div class="center" v-show="toDrag" id="filebox" v-bind:class="{'drag-over':isDragOver}"
         @dragover.prevent="isDragOver=true" @dragleave.prevent="isDragOver=false" @drop.prevent="drop">
        <p class="is-size-5 has-text-link has-text-weight-semibold">{{ $t("msg.fileReceive.dropMsg") }}</p>
      </div>

    </section>

  </div>
</div>

</template>
<script>
const log = window.log
const fs = window.nodeFs;
const path = window.nodePath;

export default {
  name: "receive",
  props: {
    showModal: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      toDrag:true,
      isDragOver:false,
      errors: [],
      //ip:''
    }
  },
  methods: {
    closeModal() {
      this.clearup()
      this.emitter.emit('close', 'windowReceive');
    },

    async drop(event){
      let fn = event.dataTransfer.files[0]
      this.toDrag = false

      if(this.fileTypeIsSupported(fn)){
        let content

        try{
          content = fs.readFileSync(fn.path, {
            encoding: "utf8",
            flag: "r"
          });



        }catch(e){
          log.error('read tx file error:' + e)
          this.errors.push(this.$t('msg.fileReceive.WrongFileType'))
          return
        }

        let filePath = path.dirname(fn.path);


        let fn_output = await window.api.showSaveDialog(this.$t('msg.save'), this.$t('msg.fileSend.saveMsg'), filePath);


        if(fn_output){
          this.$walletService.receiveTransaction(JSON.parse(content), null, null)
              .then( (res) => {
                let data = res.data.result;

                if(data.Ok){

                  fs.writeFileSync(fn_output.filePath, JSON.stringify(data.Ok), {
                    encoding: "utf8",
                    flag: "w"
                  });
                  this.emitter.emit('update')
                  this.closeModal()
                  log.debug(`Generated responce file ok`)


                }else if(data.Err){
                  log.error(`resp.data:${data.Err}`);
                  let e1 = data.Err;
                  this.errors.push(e1)
                }

              }).catch((error) => {
                log.error('receiveTransaction error:' + error)
                if (error.response) {
                  let resp = error.response
                  log.error(`resp.data:${resp.data}; status:${resp.status};headers:${resp.headers}`)
                }
                let e1 = this.$t('msg.fileReceive.CreateFailed')
                this.errors.push(e1)
              })
        }else{
          this.errors.push(this.$t('msg.fileReceive.NoSavePlace'))
        }
      }
      else{
        this.errors.push(this.$t('msg.fileReceive.WrongFileType'))
      }
    },
    clearup(){
      this.errors = []
      this.toDrag = true
      this.isDragOver = false
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
<style>
#filebox {
  height:280px;
  border-style:dashed;
  border-width:2px;
  color:#dbdbdb;/*#3273dc;*/
  background-color: white;
}

#filebox.drag-over{
  border-color:#22509a;
  background-color:#f6f9fe;
}

.center{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
