<template>
  <section class="section is-main-section">
    <form v-on:submit.prevent="search" >
      <div class="field has-addons">
        <div class="control is-expanded">
          <input class="input" type="text" placeholder="Search..." v-model="keyword" >
        </div>
        <div class="control">
          <button v-show="!searched" class="button is-primary"><span class="icon"><mdicon name="dots-horizontal" /></span></button>
          <button @click.prevent="clearup(false)" v-show="searched" class="button is-primary"><span class="icon"><mdicon name="close-circle-outline" /></span></button>
        </div>
      </div>
    </form>
    <p>&nbsp;</p>
    <div id="accordion_first">
      <article class="message is-info">
        <div class="message-header is-clickable" @click="toggleState" data-toggle="accordion-1">
          <p style="pointer-events: none;">What is the Wallet Listener?</p>
        </div>
        <div class="message-body is-hidden" id="accordion-1"  >
          <div class="message-body-content" data-toggle="accordion-1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </div>
        </div>
      </article>
      <article class="message is-info">
        <div class="message-header is-clickable" @click="toggleState" data-toggle="accordion-2">
          <p style="pointer-events: none;">What is a node?</p>
        </div>
        <div class="message-body is-hidden" id="accordion-2" >
          <div class="message-body-content" data-toggle="accordion-2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </div>
        </div>
      </article>
      <article class="message is-info">
        <div class="message-header is-clickable" @click="toggleState" data-toggle="accordion-3">
          <p style="pointer-events: none;">What is ngrok?</p>
        </div>
        <div class="message-body is-hidden" id="accordion-3" >
          <div class="message-body-content" data-toggle="accordion-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. ngrok
          </div>
        </div>
      </article>
    </div>


  </section>

</template>
<script>

import { ref, onMounted, onUnmounted } from 'vue';
import { useStore } from '@/store';


  export default {
    name: "help",
    setup(){

      const store = useStore();
      const elements = ref([]);
      const searchableText = ref([]);
      const keyword =  ref("");
      const searched = ref(false);

      onMounted(() => {

       let containerElements = document.querySelectorAll('.message-body');
       for(let el of containerElements){
         elements.value.push(el);
       }

       let textElements = document.querySelectorAll('.message-body-content, .message-header > p');
       searchableText.value = [];
       for(let el of textElements){
         searchableText.value.push({el:el, text:el.textContent});
       }

      });


      return{
        store,
        elements,
        searchableText,
        keyword,
        searched

      }
    },


    methods: {

      search(){
        this.clearup(true);
        let keyword = this.keyword;

        if(keyword != ''){
          let pattern = new RegExp(keyword, "i");
          for(let el of this.searchableText){
            let match = el.text.match(pattern);
            if(match){


              if(el.el.dataset.toggle){
                this.toggleState(undefined, el.el.dataset.toggle);
              }

              let elInner = el.el.innerHTML;
              var index = elInner.toLowerCase().indexOf(keyword.toLowerCase());

              if (index >= 0) {
               elInner = elInner.substring(0, index) + "<span class='has-background-warning has-text-black-bis'>" + elInner.substring(index,index+keyword.length) + "</span>" + elInner.substring(index + keyword.length);
               el.el.innerHTML = elInner;
              }
            }else{
              el.el.innerHTML = el.el.innerText;
            }
          }

          this.searched = true;
        }

      },
      clearup(keepKeyword){

        if(!keepKeyword){
          this.keyword = '';
        }
        this.searched = false;
        for(let el of this.elements){
          el.classList.add("is-hidden");
        }
        for(let el of this.searchableText){
          el.el.innerHTML = el.el.innerText;
        }
      },
      toggleState(event, dataset){

        let refName = '';
        let openToggle = false;
        if(event){
          refName = event.target.dataset.toggle;
        }
        if(dataset){
          refName = dataset;
          openToggle = true;
        }


        for(let el of this.elements){

          if(el.id == refName){

            if(el.classList.contains("is-hidden")){
              el.classList.remove("is-hidden");
            }else{
              if(!openToggle){
                el.classList.add("is-hidden");
              }
            }

          }else{
            if(!openToggle){
              el.classList.add("is-hidden");
            }
          }
        }
      }
    }
  }
</script>
