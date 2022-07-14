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
              <p>The send command is the first step of building an interactive transaction.<br/>
              The transaction can either be an instant synchronous exchange through Tor, ngrok,
              or it can be an asynchronous process, in which each step is done manually by exchanging
              in file format.<br/>
              <br/>
              If you want to start a new transaction, then make sure that your
              Node Server is fully synced to the epic network. The status of your node server should be displayed as "synced".<br/>
              <br/>
              The Recipient Address can be a TOR onion Address or any other external http(s) Address.<br/>
              <br/>
              If you want to have a proof of this transaction you can add the proof address you get from recipient.<br/>
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
              To receive coins your wallet must be in listen mode.<br/>
              With the default settings your wallet is started in listen/receive mode by default.<br/>
              <br/>
              You can change this behaviour in Settings.<br/>
              <br/>
              On the Receive page you have a list with the available addresses others can send to.
              Your proof address is also displayed at this page.
              If something goes wrong and your wallet cannot receive coins, then you can restart
              the listener on the receive page.<br/>
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
              If you make a offline transaction. Then you import here the received finalize transaction file from receiver.
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
              If somebody sends you a offline transaction, then you can import on this page the transaction file.<br/>
              <br/>
              After the import you must save a finalization transaction file and send back to sender.<br/>

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
              In the address book you can save your contacts and their addresses.<br/>
              Later if you create a new transaction you can search in the "Recipient Address" field for your
              contacts and paste the found addresses from the address book.<br/>

            </div>
          </div>
        </article>
      </div>
      <div class="column is-half">
        <article class="message is-dark">
          <div class="message-header is-clickable" @click="toggleState" data-toggle="accordion-6">
            <p style="pointer-events: none;">Transaction-ID</p>
          </div>
          <div class="message-body is-hidden" id="accordion-6" >
            <div class="message-body-content" data-toggle="accordion-6">
              The transaction ID is the unique identifier for every transaction the receiver and you are sharing.<br/>
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
              The coin id is the unique identifier for your coins on the blockchain.<br/>
              Only you see the value of the coin-id<br/>
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
              The wallet listener must be run if you want to receive coins from other wallets.<br/>
              You can stop and start the listener on page "Receive"<br/>
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
              In your account you can set a username and a keybase account.<br/>
              The username is displayed all over the app at the top.<br/>
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
              Here you can change the settings you made at the setup assistant process.<br/>
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
              This is the location of your node server. The node server is required for the wallet to send and receive coins<br/>
              This can be the build-in server or an external Server address. If you change this value, please restart your wallet<br/>
            </div>
          </div>
        </article>
      </div>
      <div class="column is-half">
        <article class="message is-dark">
          <div class="message-header is-clickable" @click="toggleState" data-toggle="accordion-12">
            <p style="pointer-events: none;">Wallet listener</p>
          </div>
          <div class="message-body is-hidden" id="accordion-12" >
            <div class="message-body-content" data-toggle="accordion-12">
              Here you can change the behaviour of the wallet listener at startup. If you dont want to start the listener by default,<br/>
              then uncheck the checkbox<br/>
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
