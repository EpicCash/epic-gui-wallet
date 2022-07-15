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
    <div class="columns is-multiline">
      <div class="column is-half">
        <article class="message is-dark">
          <div class="message-header is-clickable" @click="toggleState" data-toggle="accordion-1">
            <p style="pointer-events: none;">Send coins</p>
          </div>
          <div class="message-body is-hidden" id="accordion-1"  >
            <div class="message-body-content" data-toggle="accordion-1">
              <p>
                The send command is the first step in building an interactive transaction.<br/>
                <br/>
                The transaction can either be carried out instantaneously using either<br/>
                the Tor network or ngrok, or done manually through the exchange of files.<br/>
                <br/>
                To start a new transaction, make sure your node server is fully synced<br/>
                to the Epic Cash network.<br/>
                The status of your node server should read, “synced.”<br/>
                <br/>
                The recipient address can either be a Tor onion address or an external http(s) address.<br/>
                <br/>
                To have proof the transaction was carried out, enter the proof address provided by the receiver.<br/>
              </p>
            </div>
          </div>
        </article>
      </div>
      <div class="column is-half">
        <article class="message is-dark">
          <div class="message-header is-clickable" @click="toggleState" data-toggle="accordion-2">
            <p style="pointer-events: none;">Receive coins</p>
          </div>
          <div class="message-body is-hidden" id="accordion-2" >
            <div class="message-body-content" data-toggle="accordion-2">
              To receive coins, your wallet must be in listen mode.<br/>
              <br/>
              The wallet’s default settings activate the listen/receive mode by default.<br/>
              This feature can be changed in Settings.<br/>
              <br/>
              On the Receive Page, there will be a list of addresses that can be used to receive coins.<br/>
              <br/>
              Your proof address is also displayed on this page.<br/>
              <br/>
              If something goes wrong and your wallet is not receiving coins, restart the listener on the Receive Page.<br/>
            </div>
          </div>
        </article>
      </div>
      <div class="column is-half">
        <article class="message is-dark">
          <div class="message-header is-clickable" @click="toggleState" data-toggle="accordion-3">
            <p style="pointer-events: none;">Finalize offline transaction</p>
          </div>
          <div class="message-body is-hidden" id="accordion-3" >
            <div class="message-body-content" data-toggle="accordion-3">
              To finalize an offline transaction, use this page to import the finalized<br/>
              transaction file provided by the receiver.<br/>
            </div>
          </div>
        </article>
      </div>
      <div class="column is-half">
        <article class="message is-dark">
          <div class="message-header is-clickable" @click="toggleState" data-toggle="accordion-4">
            <p style="pointer-events: none;">Import offline transaction</p>
          </div>
          <div class="message-body is-hidden" id="accordion-4" >
            <div class="message-body-content" data-toggle="accordion-4">
              Use this page to import the transaction file provided by the receiver.<br/>
              <br/>
              After importing the transaction file, save a finalized transaction file and deliver it<br/>
              to the sender.<br/>
            </div>
          </div>
        </article>
      </div>
      <div class="column is-half">
        <article class="message is-dark">
          <div class="message-header is-clickable" @click="toggleState" data-toggle="accordion-5">
            <p style="pointer-events: none;">Address book</p>
          </div>
          <div class="message-body is-hidden" id="accordion-5" >
            <div class="message-body-content" data-toggle="accordion-5">
              Save your contacts and their addresses in the address book.<br/>
              <br/>
              If you later decide to make another transaction, you can search for the contact’s address in the recipient’s address field.<br/>
            </div>
          </div>
        </article>
      </div>
      <div class="column is-half">
        <article class="message is-dark">
          <div class="message-header is-clickable" @click="toggleState" data-toggle="accordion-6">
            <p style="pointer-events: none;">Transaction ID</p>
          </div>
          <div class="message-body is-hidden" id="accordion-6" >
            <div class="message-body-content" data-toggle="accordion-6">
              The Transaction ID is the unique identifier for each transaction shared by the receiver and sender.<br/>
            </div>
          </div>
        </article>
      </div>
      <div class="column is-half">
        <article class="message is-dark">
          <div class="message-header is-clickable" @click="toggleState" data-toggle="accordion-7">
            <p style="pointer-events: none;">Coin ID</p>
          </div>
          <div class="message-body is-hidden" id="accordion-7" >
            <div class="message-body-content" data-toggle="accordion-7">
              The Coin ID is the unique identifier for your coins on the blockchain.<br/>

              Only you can see the Coin ID value.<br/>
            </div>
          </div>
        </article>
      </div>
      <div class="column is-half">
        <article class="message is-dark">
          <div class="message-header is-clickable" @click="toggleState" data-toggle="accordion-8">
            <p style="pointer-events: none;">Wallet listener</p>
          </div>
          <div class="message-body is-hidden" id="accordion-8" >
            <div class="message-body-content" data-toggle="accordion-8">
              The wallet listener must be running to receive coins from other wallets.<br/>
              <br/>
              The listener can be started or stopped on the Receive Page.<br/>
            </div>
          </div>
        </article>
      </div>
      <div class="column is-half">
        <article class="message is-dark">
          <div class="message-header is-clickable" @click="toggleState" data-toggle="accordion-9">
            <p style="pointer-events: none;">Account</p>
          </div>
          <div class="message-body is-hidden" id="accordion-9" >
            <div class="message-body-content" data-toggle="accordion-9">
              Set your username and keybase account in Account.<br/>
              <br/>
              The username is displayed at the top of the app.<br/>
            </div>
          </div>
        </article>
      </div>
      <div class="column is-half">

        <article class="message is-dark">
          <div class="message-header is-clickable" @click="toggleState" data-toggle="accordion-10">
            <p style="pointer-events: none;">Settings</p>
          </div>
          <div class="message-body is-hidden" id="accordion-10" >
            <div class="message-body-content" data-toggle="accordion-10">
              Here you can change the settings made during the setup assistant process.<br/>
            </div>
          </div>
        </article>
      </div>
      <div class="column is-half">
        <article class="message is-dark">
          <div class="message-header is-clickable" @click="toggleState" data-toggle="accordion-11">
            <p style="pointer-events: none;">Node Server</p>
          </div>
          <div class="message-body is-hidden" id="accordion-11" >
            <div class="message-body-content" data-toggle="accordion-11">
              This is the location of your node server.<br/>
              <br/>
              A node server is required for the wallet to send and receive coins.<br/>
              <br/>
              You can choose between the built-in node server and an external node server.<br/>
              If you change this value, please restart your wallet.<br/>
            </div>
          </div>
        </article>
      </div>
      <div class="column is-half">
        <article class="message is-dark">
          <div class="message-header is-clickable" @click="toggleState" data-toggle="accordion-13">
            <p style="pointer-events: none;">Your Ngrok Authtoken</p>
          </div>
          <div class="message-body is-hidden" id="accordion-13" >
            <div class="message-body-content" data-toggle="accordion-13">
              The ngrok auth-token is required for the ngrok service to receive coins from other wallets.<br/>
              If you dont want to use the ngrok service, then leave "our Ngrok Authtoken" field empty.<br/>
            </div>
          </div>
        </article>
      </div>
      <div class="column is-half">
        <article class="message is-dark">
          <div class="message-header is-clickable" @click="toggleState" data-toggle="accordion-14">
            <p style="pointer-events: none;">Import offline transaction</p>
          </div>
          <div class="message-body is-hidden" id="accordion-14" >
            <div class="message-body-content" data-toggle="accordion-14">
              If somebody sends you a offline transaction, then you can import it on page "Import offline transaction".<br/>
              After the import you must save a finalization transaction file and send it back to sender.<br/>

            </div>
          </div>
        </article>
      </div>
      <div class="column is-half">
        <article class="message is-dark">
          <div class="message-header is-clickable" @click="toggleState" data-toggle="accordion-15">
            <p style="pointer-events: none;">Mnemonic Words</p>
          </div>
          <div class="message-body is-hidden" id="accordion-15" >
            <div class="message-body-content" data-toggle="accordion-15">
              The Mnemoonic Words are the words you need to recover your wallet. Make a backup of this words
              in the same order they are displayed.<br/>
              <br/>
              Later if you loose your wallet data, you can recover the wallet<br/>
              with this words.<br/>
            </div>
          </div>
        </article>
      </div>
      <div class="column is-half">
        <article class="message is-dark">
          <div class="message-header is-clickable" @click="toggleState" data-toggle="accordion-16">
            <p style="pointer-events: none;">Send Payment proof and proof address</p>
          </div>
          <div class="message-body is-hidden" id="accordion-16" >
            <div class="message-body-content" data-toggle="accordion-16">
              In epic you can make transactions with a additional proof.<br/>
              <br/>
              With a proof its possible for others
              to verify that the transaction was made between the sender and receiver.<br/>
              <br/>
              To verify a proof the user needs the proof data and amount.<br/>
            </div>
          </div>
        </article>
      </div>
      <div class="column is-half">
        <article class="message is-dark">
          <div class="message-header is-clickable" @click="toggleState" data-toggle="accordion-17">
            <p style="pointer-events: none;">Tor</p>
          </div>
          <div class="message-body is-hidden" id="accordion-17" >
            <div class="message-body-content" data-toggle="accordion-17">
              You can send and receive transactions via a tor address by default. You find your tor address on page "Receive"<br/>
            </div>
          </div>
        </article>
      </div>
      <div class="column is-half">
        <article class="message is-dark">
          <div class="message-header is-clickable" @click="toggleState" data-toggle="accordion-18">
            <p style="pointer-events: none;">Ngrok</p>
          </div>
          <div class="message-body is-hidden" id="accordion-18" >
            <div class="message-body-content" data-toggle="accordion-18">
              ngrok is the programmable network edge that adds connectivity,<br/>
              security, and observability to your apps with no code changes<br/>
            </div>
          </div>
        </article>
      </div>
      <div class="column is-half">
        <article class="message is-dark">
          <div class="message-header is-clickable" @click="toggleState" data-toggle="accordion-19">
            <p style="pointer-events: none;">Network node</p>
          </div>
          <div class="message-body is-hidden" id="accordion-19" >
            <div class="message-body-content" data-toggle="accordion-19">
              A network node is a server which stores the blockchain data.<br/>
            </div>
          </div>
        </article>
      </div>
      <div class="column is-half">
        <article class="message is-dark">
          <div class="message-header is-clickable" @click="toggleState" data-toggle="accordion-20">
            <p style="pointer-events: none;">Peers</p>
          </div>
          <div class="message-body is-hidden" id="accordion-20" >
            <div class="message-body-content" data-toggle="accordion-20">
              Peers are other network nodes which are connected to your network node<br/>
            </div>
          </div>
        </article>
      </div>
      <div class="column is-half">
        <article class="message is-dark">
          <div class="message-header is-clickable" @click="toggleState" data-toggle="accordion-21">
            <p style="pointer-events: none;">Blockchain Height</p>
          </div>
          <div class="message-body is-hidden" id="accordion-21" >
            <div class="message-body-content" data-toggle="accordion-21">
              The blockchain height is the latest block number the chain have. Every 60 seconds the blockchain creates a new block height.<br/>
            </div>
          </div>
        </article>
      </div>


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
