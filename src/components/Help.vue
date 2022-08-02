<template>
  <section class="section is-main-section">
    <form v-on:submit.prevent="search" >
      <div class="field has-addons">
        <div class="control is-expanded">
          <input class="input" type="text" :placeholder="$t('msg.placeholder_search')" v-model="keyword" >
        </div>
        <div class="control">
          <button v-show="!searched" class="button is-primary"><span class="icon"><mdicon name="dots-horizontal" /></span></button>
          <button @click.prevent="clearup(false)" v-show="searched" class="button is-primary"><span class="icon"><mdicon name="close-circle-outline" /></span></button>
        </div>
      </div>
    </form>
    <p>&nbsp;</p>

    <div class="columns is-multiline">

      <template v-for="(topic, index) in help" :key="index"  >

        <div class="column is-half">
          <article class="message is-dark">
            <div class="message-header is-clickable" @click="toggleState" :data-toggle="'accordion-'+index">
              <p style="pointer-events: none;">{{ topic.title }}</p>
            </div>
            <div class="message-body is-hidden" :id="'accordion-'+index"  >
              <div class="message-body-content" :data-toggle="'accordion-'+index">
                <p>
                  <span v-html="topic.text" ></span>
                </p>
              </div>
            </div>
          </article>
        </div>
      </template>
    </div>


  </section>

</template>
<script>

import { ref, onMounted, onUnmounted } from 'vue';
import { useStore } from '@/store';
import { useHelp } from '@/help/help';


  export default {
    name: "help",
    setup(){

      const store = useStore();
      const elements = ref([]);
      const searchableText = ref([]);
      const keyword =  ref("");
      const searched = ref(false);
      const help = useHelp('en');
      onMounted(() => {


       let containerElements = document.querySelectorAll('.message-body');
       for(let el of containerElements){
         elements.value.push(el);
       }

       let textElements = document.querySelectorAll('.message-body-content, .message-header > p');
       searchableText.value = [];
       for(let el of textElements){

         searchableText.value.push({el:el, text:el.textContent, origin: null});
       }

      });


      return{
        help,
        store,
        elements,
        searchableText,
        keyword,
        searched,


      }
    },
    async created(){

      this.help = useHelp(await window.api.locale());
      //console.log('help', this.help, await window.api.locale());

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
              //save original html structure before modify
              el.origin = elInner;

              var index = elInner.toLowerCase().indexOf(keyword.toLowerCase());

              if (index >= 0) {

               elInner = elInner.substring(0, index) + "<span class='has-background-warning has-text-black-bis'>" + elInner.substring(index,index+keyword.length) + "</span>" + elInner.substring(index + keyword.length);
               el.el.innerHTML = elInner;

              }
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
          if(el.origin != null){
            el.el.innerHTML = el.html;
          }
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
