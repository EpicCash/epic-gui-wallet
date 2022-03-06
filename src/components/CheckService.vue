<template>

  <section class="section" >
    <div class="container" style="height:100vh" >
      <div class="columns is-centered ">
        <div class="column is-half " >
          <div class="box" >
              <ul id="check-list">
                <li v-for="msg in msgs" :key="msg.message">
                    <font-awesome-icon :icon="['fas', 'circle-check']"  v-if="msg.success"/>
                    <font-awesome-icon :icon="['fas', 'circle-exclamation']" v-if="!msg.success"/>
                   {{ msg.message }}
                </li>
              </ul>
          </div>
        </div>
      </div>
    </div>
  </section>

</template>

<script>

  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import { library } from '@fortawesome/fontawesome-svg-core'
  import { faCircleCheck, faCircleExclamation } from '@fortawesome/free-solid-svg-icons'



  library.add(faCircleCheck)
  library.add(faCircleExclamation)




  export default {
    name: 'checkService',
    components: {
      FontAwesomeIcon
    },
    data() {
      return {
        msgs: []

      }
    },

    created(){

      this.emitter.on('checkSuccess', (msg) => {
        console.log('checkSuccess', msg);
        this.msgs.push( {message: msg, success:true} );
      });

      this.emitter.on('checkFail', (msg) => {
        console.log('checkFail', msg);
        this.msgs.push( {message: msg, success:false} );
      });

      this.emitter.on('selectUserhomedir', () => {

      });



    }
  }

</script>

<style>
  .fa-circle-check{
     font-size:22px;
     color:green;
     vertical-align: middle;
  }
  .fa-circle-exclamation{
     font-size:22px;
     color:red;
     vertical-align: middle;
  }
  #check-list li{
    line-height:32px;
    font-size:14px;
  }
  #check-list{
    text-align:left;
  }
</style>
