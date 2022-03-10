<template>
  <div class="modal" :class="{'is-active': showMsg}">
    <div class="modal-background"></div>
    <div class="modal-content">

      <div class="message-header">
        <p>Transaction details</p>
        <button class="delete" aria-label="delete" @click="closeMsg"></button>
      </div>
      <div class="message-body">

      <table class="table is-fullwidth is-hoverable">
        <thead>
          <tr class="th">
            <th>Field</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
            <tr><td>ID</td><td>{{tx.id}}</td></tr>
            <tr><td>Slate ID</td><td>{{tx.tx_slate_id}}</td></tr>


            <tr><td>Creation date</td><td>{{$filters.datetimeFormat(tx.creation_ts)}}</td></tr>
            <tr><td>Confirmation date</td><td>{{$filters.datetimeFormat(tx.confirmation_ts)}}</td></tr>
            <tr><td>Amount credited</td><td>{{tx.amount_credited/100000000}}</td></tr>
            <tr><td>Amount debited</td><td> {{tx.amount_debited/100000000}}</td></tr>
            <tr><td>Fee</td><td>{{tx.fee/100000000}}</td></tr>
            <tr><td>Status</td><td>{{tx.status}}</td></tr>

            <tr><td>Type</td><td>{{tx.type}}</td></tr>
            <tr><td>TTl cutoff height</td><td>{{tx.ttl_cutoff_height}}</td></tr>
            <tr><td>Payment proof</td><td>{{tx.payment_proof}}</td></tr>
            <template v-if="tx.messages && tx.messages.messages">
            <tr  v-for="message in tx.messages.messages" :key="message.id" >
              <td>Message {{message.id}}</td><td>{{message.message}}</td>
            </tr>
            </template>
        </tbody>
      </table>


      </div>

    </div>
  </div>
</template>

<script>

  export default {
    name: 'transaction-detail',
    props:{
      showMsg: {
        type: Boolean,
        default: false
      },
      tx: {}

    },
    methods: {
      closeMsg() {
        this.$emit('close');
      }
    }
  }
</script>
