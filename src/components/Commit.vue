<template>

      <div class="level">
        <div class="level-left">
          <h2 class="title is-4 level-item">
            {{ $t("msg.commit.unspentCmt") }}
          </h2>
        </div>

        <div class="level-right">
          <form v-on:submit.prevent="search" class="level-item">
            <div class="field has-addons">
              <p class="control">
                <input class="input is-link is-small" type="text" placeholder="" v-model="keyword" @keyup.enter="search" v-bind:disabled="searched">
              </p>
              <p class="control">
                <button class="button is-link is-small is-outlined" @click="search" v-show="!searched">{{ $t("msg.search") }}</button>
                <button class="button is-link is-small is-outlined" @click="clearup" v-show="searched">{{ $t("msg.clearup") }}</button>
              </p>
            </div>
          </form>
        </div>

      </div>
      <table class="table is-fullwidth is-hoverable">
        <thead>
          <tr class="th">
            <th></th>
            <th>Commit</th>
            <th>{{ $t("msg.commit.heightCreated") }}</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>

          <tr v-for="(ct, index) in current_commits" :key="ct.id" >
                  <td @mouseover="(event)=>mouseover(index)" @mouseleave="mouseLeave" style="width:46px;">

                      <span v-if="showCopy===index" @click="copy(index)">
                          <font-awesome-icon :icon="['fas', 'copy']"/>
                      </span>
                      <span v-if="copied===index">

                          <font-awesome-icon :icon="['fas', 'circle-check']" style="color:white;" />

                      </span>

                  </td>
                  <td>

                    <span v-if="ct.status=='Unconfirmed'" >{{ $filters.truncate(ct.commit, 35 ) }}</span>
                    <a v-else @click="open(`${ct.commit}`)">{{ $filters.truncate(ct.commit, 35 ) }}</a>

                  </td>
                  <td>

                    <span  v-if="ct.status=='Unconfirmed'">{{ct.height}}</span>
                   <a v-else @click="open(`${ct.height}`)">{{ct.height}}</a>

                  </td>
                  <td>{{ ct.value/100000000 }}</td>
                  <td>
                    <span v-if="ct.status=='Unspent'" class="tag is-success is-rounded">{{ $t("msg.commit.unspent") }}</span>
                    <span v-if="ct.status=='toUnspent'" class="tag is-warning is-rounded">({{ct.confirmed_count+'/10'}}) {{ $t("msg.unconfirmed") }} </span>
                    <span v-if="ct.status=='Unconfirmed'" class="tag is-warning is-rounded">{{ $t("msg.unconfirmed") }}</span>
                    <span v-if="ct.status=='Locked'" class="tag is-danger is-rounded">{{ $t("msg.locked") }}</span>
                    <span v-if="ct.status=='Spent'" class="tag is-warning is-rounded">{{ $t("msg.commit.spent") }}</span>
                  </td>

          </tr>

        </tbody>
      </table>










      <br/>
      <br/>

      <div v-if="pages_count>1 && !searched" class="level">
        <div class="level-left">
        </div>
        <div class="level-right">

        <button v-if="current_page_index>1" class="button is-outlined is-link is-small level-item" @click="prev">
          <span class="is-size-7">&lt;</span>
        </button>
        <span class="level-item" style="vertical-align:bottom;">{{current_page_index}}/{{pages_count}}</span>
        <button v-if="current_page_index<pages_count" class="button is-outlined is-link is-small level-item" @click="next">
          <span class="is-size-7">&gt;</span>
        </button>
        &nbsp;&nbsp;
        <input v-model="jump_to" @keyup.enter="jump" class="input is-link is-small level-item" placeholder="2" style="width:30px">
        <button class="button is-link is-small is-outlined level-item">
          <span class="is-size-7" @click="jump">{{ $t("msg.jump") }}</span>
        </button>
        </div>
      </div>

      <p v-if="searched && current_commits.length == 0"> {{ $t("msg.commit.noCmtFound") }}</p>
      <p v-if="current_commits.length == 0 && !searched"> {{ $t("msg.commit.noCmt") }}</p>

</template>

<script>
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
  import { library } from '@fortawesome/fontawesome-svg-core'
  import { faCircleCheck, faCopy } from '@fortawesome/free-solid-svg-icons'
  library.add(faCopy)
  library.add(faCircleCheck)


  const log = window.log
  const clipboard = window.clipboard

  export default {
    name: 'commit',
    components: {
      FontAwesomeIcon
    },
    props:{
      count_per_page:{
        type:Number
      },
      nodeHeight:{
        type:Number,
        default:function(){
          return 0
        }
      }
    },

    data() {
      return {
        current_commits: [],
        total_commits: [],
        current_page_index: 1,
        pages_count: 1,
        jump_to: 2,
        keyword: "",
        searched: false,
        showCopy: -1,
        copied: -1,
      }
    },

    created () {

      this.emitter.on('updateCommits', ()=> {
          this.getCommits()
      });
      this.emitter.on('logoutCommits', ()=>{
          this.current_commits = [];
          this.total_commits = [];
          this.clearup();
      });
    },

    methods: {
      mouseover(index){
        if(this.copied===-1){
          this.showCopy = index
        }
      },
      mouseLeave(){
        this.showCopy = -1,
        this.copied =  -1
      },
      copy(index){
        let ct = this.current_commits[index]
        clipboard.writeText(ct.commit)
        this.copied = index
        this.showCopy = -1
      },

      async getCommits() {

          let commits = await this.$walletService.getCommits(false, true, null);
          if(commits && commits.result && commits.result.Ok){
            this.total_commits = this.processCommits(commits.result.Ok[1].reverse())

            this.current_commits = this.total_commits.slice(0, this.count_per_page)
            if (this.total_commits.length%this.count_per_page ==0){
              this.pages_count = parseInt(this.total_commits.length/this.count_per_page)
            }else{
              this.pages_count = parseInt(this.total_commits.length/this.count_per_page) + 1
            }
          }else{
            let resp = commits.error
            console.log('commits error', commits.error);
          }



      },

      processCommits(cts){
        let nodeHeight = this.nodeHeight
        let cts_processed = cts.map(function(ct){
          let c = ct['output']
          if( c.status === 'Unspent' && nodeHeight>0){
            c.confirmed_count = nodeHeight - c.height + 1
            if(c.confirmed_count < 10){
              c.status = 'toUnspent'
            }
          }
          return c
        })
        return cts_processed
      },

      next(){
        this.current_page_index += 1
        let s = (this.current_page_index-1)*this.count_per_page
        this.current_commits = this.total_commits.slice(s, s+this.count_per_page)
      },
      prev(){
        this.current_page_index -= 1
        var s = (this.current_page_index-1)*this.count_per_page
        this.current_commits = this.total_commits.slice(s, s+this.count_per_page)
      },
      jump(){
        this.jump_to = parseInt(this.jump_to)

        if(isNaN(this.jump_to)) {
          this.jump_to = this.current_page_index
          return
        }

        if(this.jump_to > this.pages_count) this.jump_to = this.pages_count
        if(this.jump_to < 1) this.jump_to = 1
        this.current_page_index = this.jump_to
        let s = (this.current_page_index-1)*this.count_per_page
        this.current_commits = this.total_commits.slice(s, s+this.count_per_page)
      },

      search(){
        let keyword = this.keyword
        if(this.keyword){
          this.current_commits = this.total_commits.filter(function(ct){
            if(ct.commit.search(keyword) != -1){
              return ct
            }})
          this.searched = true
        }
      },

      clearup(){
        this.keyword = ""
        this.searched = false
        let s = (this.current_page_index-1)*this.count_per_page
        this.current_commits = this.total_commits.slice(s, s+this.count_per_page)
      },
      open (link) {
        window.explorer.open(link);
      }
    }
  }
</script>

<style>
</style>
