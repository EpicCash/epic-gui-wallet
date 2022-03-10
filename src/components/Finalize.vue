<template>

<div class="modal" :class="{'is-active': showModal}">
  <div class="modal-background" @click="closeModal"></div>
  <div class="modal-card" >
    <header class="modal-card-head">
      <p class="modal-card-title is-size-4 has-text-link has-text-weight-semibold">{{ $t("msg.finalize.finalize") }}</p>
      <button class="delete" aria-label="close" @click="closeModal"></button>
    </header>
    <section class="modal-card-body" >

      <div class="notification is-warning" v-if="errors.length">
        <p v-for="error in errors" :key="error">{{ error }}</p>
      </div>
      <div class="center">
        <a class="button is-link is-outlined" v-if="errors.length" @click="clearup">{{ $t("msg.clearup") }}</a>
      </div>

      <div class="notification is-link" v-show="isSent">
        {{ $t("msg.finalize.success") }}
      </div>
      <div class="center">
        <a class="button is-link is-outlined" v-show="isSent" @click="closeModal">
          {{ $t("msg.finalize.ok") }}
        </a>
      </div>

      <div v-show="isSending">
        <p class="is-size-5">{{ $t("msg.finalize.sending") }}</p>
        <br/>
        <progress class="progress is-link" max="100"></progress>
      </div>

      <div class="center" v-show="toDrag" id="filebox2" v-bind:class="{'drag-over':isDragOver}"
         @dragover.prevent="isDragOver=true" @dragleave.prevent="isDragOver=false" @drop.prevent="drop">
        <p class="is-size-5 has-text-link has-text-weight-semibold">{{ $t("msg.finalize.dropMsg") }}</p>
      </div>

    </section>

  </div>
</div>

</template>
<script>
const log = window.log
const fs = window.nodeFs;

export default {
  name: "finalize",
  props: {
    showModal: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      errors: [],
      toDrag:true,
      isDragOver:false,
      isSent:false,
      isSending:false
    }
  },
  methods: {
    closeModal() {
      this.clearup()
      this.emitter.emit('close', 'windowFinalize');
    },

    drop(event){
      let fn = event.dataTransfer.files[0]
      this.toDrag = false

      if(this.fileTypeIsSupported(fn)){
        let tx_id
        let content

        try{
          content = fs.readFileSync(fn.path, {
            encoding: "utf8",
            flag: "r"
          });
          let data = JSON.parse(content)
          tx_id = data.id
          log.debug('tx to finalize is ' + tx_id)
        }catch(e){
          log.error('read tx file error:' + e)
          this.errors.push(this.$t('msg.finalize.WrongFileType'))
          return
        }

        this.isSending = true
        let send = async function(){

          let res = await this.$walletService.finalizeTransaction(JSON.parse(content));
          console.log('finalize', res);
          if(res && res.result && res.result.Ok){
            //TODO: implement fluff true/false (Dandelion)
            let tx = res.result.Ok.tx;
            let res2 = await this.$walletService.postTransaction(tx);
            if(res2 && res2.result && res2.result.Ok == null ){
              this.isSent = true
              tx_id = res.result.Ok;

              this.$dbService.addPostedUnconfirmedTx(tx_id)
            }else{
              this.errors.push(res2.error.message);
            }




          }else{
            this.errors.push(res.error.message);
          }


          this.isSending = false;
          this.emitter.emit('update')
        }
        send.call(this)

      }
    },
    clearup(){
      this.errors = []
      this.toDrag = true
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
<style>
#filebox2 {
  height:280px;
  border-style:dashed;
  border-width:2px;
  color:#dbdbdb;/*#3273dc;*/
  background-color: white;

}

#filebox2.drag-over{
  border-color:#22509a;
  background-color:#f6f9fe;
}

.center{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
