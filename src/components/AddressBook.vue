<template>


  <section class="section is-main-section">
    <modal-box
      :is-active="isModalActive"
      :trash-object-name="trashObject ? trashObject.name : null "
      @confirm="trashConfirm"
      @cancel="trashCancel"
    />

    <div class="columns">
      <div class="column is-half">
        <nav class="panel">
          <p class="control">
            <input class="input" type="text" placeholder="Search">
          </p>
          <p>&nbsp;</p>
          <template v-for="address in addressList" :key="address.id">
            <a v-bind:class="{'is-active': toggleActive}" class="panel-block" @click="callAddress(address)">
              {{address.name}}
            </a>

          </template>

          <div class="panel-block is-pulled-right">
            <button class="button is-primary is-small " @click="create()"><mdicon name="plus" /></button>
          </div>

        </nav>

      </div>
      <div class="column is-half">

        <div v-if="isEditAddress || isNewAddress" class="card tile is-child">

          <header class="card-header">
            <p class="card-header-title">
              <span class="icon"><i class="mdi mdi-account-circle default"></i></span>
              <span>{{name}}</span>
            </p>
          </header>

          <div class="card-content">

            <input type="hidden" v-model="id" >

            <div class="field">
              <div class="control">
                <label>Name</label>
                <input class="input" type="text" v-model="name" >
              </div>
            </div>

            <div class="field">
              <div class="control">
                <label>Country</label>
                <input class="input" type="text" v-model="country" >
              </div>
            </div>

            <div class="field">
              <div class="control">
                <label>City</label>
                <input class="input" type="text" v-model="city" >
              </div>
            </div>

            <div class="field">
              <div class="control">
                <label>Tor-Onion Address</label>
                <input class="input" type="text" v-model="onion" >
              </div>
            </div>

            <div class="field">
              <div class="control">
                <label>Keybase Account</label>
                <input class="input" type="text" v-model="keybase" >
              </div>
            </div>

            <div class="field">
              <div class="control">
                <label>External Address 1</label>
                <input class="input" type="text" v-model="externalOne" >
              </div>
            </div>

            <div class="field">
              <div class="control">
                <label>External Address 2</label>
                <input class="input" type="text" v-model="externalTwo" >
              </div>
            </div>

            <div class="field">
              <div class="control">

                <label>Proof Address</label>
                <input class="input" type="text" v-model="proofaddr" >
              </div>
            </div>

            <div class="field">
              <div class="control">
                <label class="checkbox">
                  <input class="switch is-success" id="alwaysProofSwitch" type="checkbox" v-model="alwaysproof">
                  <label for="alwaysProofSwitch">send always proof</label>
                </label>
              </div>
            </div>

            <div class="field">
              <div class="control">
                <label>Notice</label>
                <textarea class="textarea" v-model="notice" ></textarea>
              </div>
            </div>


          </div>
          <footer class="card-footer">

              <a v-if="!isNewAddress" href="#" class="card-footer-item" @click="updateAddressById()">Save</a>
              <a v-else href="#" class="card-footer-item" @click="addAddress()">Save</a>
              <a href="#" class="card-footer-item" @click="cancel()">Cancel</a>
              <a v-if="!isNewAddress" href="#" class="card-footer-item" @click.prevent="trashModalOpen(selectedAddress)">Delete</a>

          </footer>


        </div><!-- end edit form -->



        <div v-else-if="addressLoaded" class="card tile is-child">
          <header class="card-header">
            <p class="card-header-title">
              <span class="icon"><i class="mdi mdi-account-circle default"></i></span>
              <span>{{name}}</span>
            </p>
          </header>

          <div class="card-content">

            <p class="block" v-if="country"><label class="label">Country</label>{{country}}</p>
            <p class="block" v-if="city"><label class="label">City</label> {{city}}</p>
            <p class="block" v-if="onion"><label class="label">Tor-Onion Address</label><span>{{onion}}</span>&nbsp;<mdicon @click="copy(onion)" name="content-copy" size=16 /></p>
            <p class="block" v-if="keybase"><label class="label">Keybase Account</label> {{keybase}}&nbsp;<mdicon @click="copy(keybase)" name="content-copy" size=16 /></p>
            <p class="block" v-if="externalOne"><label class="label">External Address 1</label> {{externalOne}}&nbsp;<mdicon @click="copy(externalOne)" name="content-copy" size=16 /></p>
            <p class="block" v-if="externalTwo"><label class="label">External Address 2</label> {{externalTwo}}&nbsp;<mdicon @click="copy(externalTwo)" name="content-copy" size=16 /></p>


            <p class="block" v-if="proofaddr"><label class="label">Proof Address</label> {{proofaddr}}&nbsp;<mdicon @click="copy(proofaddr)" name="content-copy" size=16 /></p>
            <p class="block" v-if="proofaddr"><label class="label">Send always proof</label> {{alwaysproof == true ? 'yes' : 'no'}}</p>

            <p class="block" v-if="notice"><label class="label">Notice</label> <pre>{{notice}}</pre></p>


          </div>
          <footer class="card-footer">
              <a href="#" class="card-footer-item" @click="edit()">Edit</a>
              <a href="#" class="card-footer-item" @click.prevent="trashModalOpen(selectedAddress)">Delete</a>

          </footer>

        </div>
        <div v-else class="card tile is-child"></div>

      </div>
    </div>

  </section>


</template>
<script>

const log = window.log;

import { ref } from 'vue';
import { useStore } from '@/store';
import ModalBox from '@/components/layout/ModalBox.vue'


export default {
  name: "addressBook",
  components: { ModalBox },
  setup() {


    const id = ref(0);
    const name = ref('');
    const country = ref('');
    const city = ref('');

    const onion = ref('');
    const keybase = ref('');
    const alwaysproof = ref(false);
    const proofaddr = ref('');
    const addressList = ref([]);
    const externalOne = ref('');
    const externalTwo = ref('');
    const notice = ref('');

    const toggleActive = ref(false);
    const isEditAddress = ref(false);
    const isNewAddress = ref(false);

    const selectedAddress = ref({});

    const addressLoaded = ref(false);
    const isModalActive = ref(false);
    const trashObject = ref(null);

    const store = useStore();



    return {
      store,
      id,
      name,
      country,
      city,
      onion,
      keybase,
      alwaysproof,
      proofaddr,
      externalOne,
      externalTwo,
      notice,
      addressList,
      isEditAddress,
      addressLoaded,
      isNewAddress,
      isModalActive,
      trashObject,
      selectedAddress,
      toggleActive,

    }

  },
  async created(){

    this.addressList = await this.$addressBookService.getAddress();
  },

  methods: {

    trashModalOpen(obj){

      this.trashObject = obj
      this.isModalActive = true
    },

    trashConfirm(){
      this.isModalActive = false
      this.deleteAddress(this.trashObject.id);

    },

    trashCancel(){
      this.isModalActive = false
    },
    copy(text){
      window.clipboard.writeText(text);
      this.$toast.show("Copied to clipboard!", {duration:1000});

    },
    callAddress(addressItem){

      this.toggleActive = this.toggleActive !== true;

      this.selectedAddress = addressItem;

      this.id = addressItem.id;
      this.name = addressItem.name;
      this.country = addressItem.country;
      this.city = addressItem.city;
      this.onion = addressItem.onion;
      this.keybase = addressItem.keybase;
      this.alwaysproof = addressItem.alwaysproof;
      this.proofaddr = addressItem.proofaddr;
      this.externalOne = addressItem.externalOne;
      this.externalTwo = addressItem.externalTwo;
      this.notice = addressItem.notice;

      this.addressLoaded = this.toggleActive;

    },
    edit(){
      this.isEditAddress = true;
      this.isNewAddress = false;
    },
    cancel(){
      this.isEditAddress = false;
      this.isNewAddress = false;
      this.addressLoaded = false;
      this.id = 0;
    },
    create(){

      this.id = 0;
      this.name = '';
      this.country = '';
      this.city = '';
      this.onion = '';
      this.keybase = '';
      this.alwaysproof = false;
      this.proofaddr = '';
      this.addressLoaded = false;
      this.isEditAddress = false;
      this.isNewAddress = true;
      this.externalOne = '';
      this.externalTwo = '';
      this.notice = '';

    },
    async deleteAddress(id){

      if(id){
        let deleted = await this.$addressBookService.removeAddress(id);
        if(deleted){
          this.$toast.error("Address deleted!", {duration:1000});
          this.addressList = await this.$addressBookService.getAddress();
          this.isEditAddress = false;
          this.selectedAddress = {};
          this.isNewAddress = false;
          this.addressLoaded = false;
          this.id = 0;
        }else{
          this.$toast.error("Error delete address!", {duration:1000});
        }
      }

    },
    async updateAddressById(){


      let updated = await this.$addressBookService.updateAddressById( this.id, {
        name: this.name,
        country: this.country,
        city: this.city,
        onion: this.onion,
        keybase: this.keybase,
        alwaysproof: this.alwaysproof,
        proofaddr: this.proofaddr,
        externalOne: this.externalOne,
        externalTwo: this.externalTwo,
        notice: this.notice

      });
      if(updated){
        this.addressList = await this.$addressBookService.getAddress();
        this.isEditAddress = false;
      }

    },
    async addAddress(){


      let inserted = await this.$addressBookService.addAddress({
        name: this.name,
        user_id: this.store.state.user.id,
        country: this.country,
        city: this.city,
        onion: this.onion,
        keybase: this.keybase,
        alwaysproof: this.alwaysproof,
        proofaddr: this.proofaddr,
        externalOne: this.externalOne,
        externalTwo: this.externalTwo,
        notice: this.notice

      });
      if(inserted){

        this.addressList = await this.$addressBookService.getAddress();
        this.isNewAddress = false;
        this.isEditAddress = false;
      }

    }

  }


}

</script>
