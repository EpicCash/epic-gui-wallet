import { createStore } from 'vuex';
import axios from 'axios';



export const store = createStore({
  state: {
    /* AppStyle (needed for demo render() in main.js) */
    appStyle: 'default',
    debug: false,

    //hide amount values with *****
    hideValues: false,
    /* User */
    userName: null,
    userEmail: null,
    userAvatar: null,

    /* NavBar */
    isNavBarVisible: false,

    /* FooterBar */
    isFooterBarVisible: true,

    /* Aside */
    isAsideVisible: false,
    isAsideExpanded: false,

    asideActiveForcedKey: null,
    isAsideRightVisible: false,
    isAsideRightActive: false,

    /* Updates */
    hasUpdates: false,

    /* Overlay */
    isOverlayVisible: false,

    /* Layout */
    isLayoutFullPage: false,
    isLayoutBoxed: false,
    isLayoutAsideHidden: true,


    /* Dark mode (available with AppLightDark.vue only) */
    isDarkModeActive: true,


    /* which service are running */
    walletListenerService: false,
    torService: false,
    ngrokService: false,
    ngrokTunnels: {},
    ngrokTunnelLifetime: [0,0],
    nodeType: '',
    nodeStatus: {

      sync_info:{
        current_height:0,
        highest_height:0
      }

    },

    user: {},
    stuffUpdates: [],
    updates: [],
    txs: [],
    commits: [],
    summary: {
      spendable: 0,
      total: 0,
      unconfirmed: 0,
      unfinalization: 0,
      immature: 0,
      locked: 0,
    },
  },
  mutations: {
    /* A fit-them-all commit */
    basic (state, payload) {
      state[payload.key] = payload.value
    },

    walletListenerService(state, payload){
      state.walletListenerService = payload;
      state.torService = payload;
    },
    ngrokService(state, payload){
      state.ngrokService = payload;
    },
    ngrokTunnels(state, payload){
      state.ngrokTunnels = payload;
    },
    ngrokTunnelLifetime(state, payload){
      state.ngrokTunnelLifetime = payload;
    },




    torService(state, payload){
      state.torService = payload;
    },
    nodeStatus(state, payload){


        if(payload.sync_status){
          switch(payload.sync_status){
            case 'header_sync':
              payload.sync_status = 'Header sync'
            break;
            case 'body_sync':
              payload.sync_status = 'Body sync'
            break;
            case 'awaiting_peers':
              payload.sync_status = 'Awaiting peers'
            break;
            default:
              payload.sync_status = 'synced'
            break;
          }

        if(payload && !payload.sync_info){
          payload.sync_info = {
            current_height:0,
            highest_height:0
          }
        }
        state.nodeStatus = payload;
      }
    },
    nodeType(state, payload){
      state.nodeType = payload;
    },

    /* AppStyle */
    appStyle (state, payload) {
      state.appStyle = payload
    },

    txs(state, payload) {
      if (payload) {
        state.txs = payload;
      }
    },

    summary(state, payload) {
      if (payload) {
        state.summary = payload;
      }
    },

    commits(state, payload) {
      if (payload) {
        state.commits = payload;
      }
    },

    hideValues(state) {
      state.hideValues = state.hideValues !== true;
    },


    /* User */
    user (state, payload) {
      if(payload){
        state.user = payload
      }

      if (payload.name) {
        let filteredName = payload.name.replace(/^\s*([a-zA-Z]).*\s+([a-zA-Z])\S+$/g, '$1$2');
        state.userAvatar = filteredName.slice(0, (payload.name.split(' ').length > 1 ? 2 : 1)).toUpperCase();
      }

    },

    /* aside right update */
    updates(state, payload) {
      if (payload) {
        state.updates.unshift(payload);
        state.hasUpdates = true;
      }

    },

    /* Full Page mode */
    fullPage (state, payload) {
      state.isNavBarVisible = !payload
      state.isAsideVisible = !payload
      state.isFooterBarVisible = !payload
      state.isOverlayVisible = false
      state.isLayoutFullPage = payload
    },

    /* Aside Desktop Visibility */
    asideVisibilityToggle (state, payload) {
      state.isAsideVisible = payload
    },

    /* Aside Desktop State */
    asideStateToggle (state, payload = null) {
      const isExpand = payload !== null ? payload : !state.isAsideExpanded

      document.documentElement.classList[isExpand ? 'add' : 'remove']('has-aside-expanded')

      state.isAsideExpanded = isExpand
    },



    /* Aside Forced Active Key (when secondary submenu is open) */
    asideActiveForcedKeyToggle (state, payload) {
      state.asideActiveForcedKey = payload && payload.menuSecondaryKey ? payload.menuSecondaryKey : null
    },

    /* Aside Right */
    asideRightToggle (state, payload) {
      state.isAsideRightVisible = payload
      state.isAsideRightActive = payload
      state.hasUpdates = false
    },

    /* Overlay */
    overlayToggle (state, payload = null) {
      const setIsVisible = payload !== null ? payload : !state.isOverlayVisible

      if (!setIsVisible && state.isLayoutAsideHidden && (state.isAsideVisible || state.isAsideRightVisible)) {
        return
      }

      state.isOverlayVisible = setIsVisible

      document.documentElement.classList[setIsVisible ? 'add' : 'remove']('is-clipped')
    },

    /* Layouts */
    layoutBoxedToggle (state, payload = null) {
      const setIsBoxed = payload !== null ? payload : !state.isLayoutBoxed

      state.isLayoutAsideHidden = setIsBoxed
      state.isLayoutBoxed = setIsBoxed
      state.isAsideExpanded = setIsBoxed
      state.isAsideVisible = !setIsBoxed
      state.isAsideRightVisible = false
      state.isAsideRightActive = false

      document.documentElement.classList[setIsBoxed ? 'remove' : 'add']('has-aside-left', 'has-navbar-fixed-top')
      document.documentElement.classList[setIsBoxed ? 'add' : 'remove']('has-boxed-layout', 'has-aside-hidden-layout', 'has-aside-expanded')
    },

    layoutWideToggle (state, payload = null) {
      const setIsWide = payload !== null ? payload : !state.isLayoutBoxed

      state.isLayoutAsideHidden = setIsWide
      state.isAsideExpanded = setIsWide
      state.isAsideVisible = !setIsWide
      state.isAsideRightVisible = !setIsWide

      document.documentElement.classList[setIsWide ? 'remove' : 'add']('has-aside-left')
      document.documentElement.classList[setIsWide ? 'add' : 'remove']('has-aside-hidden-layout', 'has-aside-expanded')
    },

    /* Dark Mode */
    darkModeToggle (state, payload = null) {
      const setIsDark = payload !== null ? payload : !state.isDarkModeActive

      state.isDarkModeActive = setIsDark

      document.documentElement.classList[setIsDark ? 'add' : 'remove']('is-dark-mode-active')
    },



  },
  actions: {

    async processTxs({ commit, state }, payload) {

      let transactionsWithAddress = await payload.table.getAddress(state.user.id);

      let txs_processed = await payload.data.map(function(x){
        x.status = 'unconfirmed'
        if( x.confirmed){
          x.status = 'confirmed'
        }
        if( x.tx_type.search('Cancelled') != -1){
          x.status = 'cancelled'
        }
        if(x.status === 'unconfirmed'){
          x.cancelable = true
        }
        let hasAddress = transactionsWithAddress.find(function(transaction, index) {
          if(transaction.slateid == x.tx_slate_id)
            return true;
        });
        if(hasAddress){

          x.address = hasAddress;
        }

        return x
      })
      state.debug ? console.log('processTxs', txs_processed) : null;
      commit('txs', txs_processed);

    },

    processCommits({ commit, state }, cts){

      let currentHeight = state.nodeStatus.tip ? state.nodeStatus.tip.height : 0;

      let cts_processed = cts.map(function(ct){
        let c = ct['output']


        if(currentHeight > 0 && c.status == "Unspent" && (Number(c.height)+10) > currentHeight){

          c.status = 'toUnspent';
          c.confirmed_count = currentHeight-Number(c.height);
        }

        return c
      })

      state.debug ? console.log('processCommits', cts_processed) : null;
      commit('commits', cts_processed);
    },

    asideCloseAll ({ commit }) {
      commit('asideVisibilityToggle', false)
      commit('asideRightToggle', false)
      commit('overlayToggle', false)
    },
    asideVisibilityToggle ({ commit, state }, payload = null) {
      const setIsVisible = payload !== null ? payload : !state.isAsideVisible

      commit('asideVisibilityToggle', setIsVisible)
      commit('overlayToggle', setIsVisible)
    },
    asideRightToggle ({ commit, state }, payload = null) {
      const isShow = payload !== null ? payload : !state.isAsideRightVisible

      commit('asideRightToggle', isShow)

      if (state.isLayoutAsideHidden) {
        commit('overlayToggle', isShow)
      }

      if (!state.isLayoutAsideHidden) {
        document.documentElement.classList[isShow ? 'add' : 'remove']('has-aside-right')
      }
    },

    toggleFullPage ({ commit }, payload) {


      commit('layoutBoxedToggle', false)
      commit('fullPage', payload)

      document.documentElement.classList.remove('is-clipped')

      if (payload) {
        document.documentElement.classList.remove('has-aside-left', 'has-navbar-fixed-top')
      }
    },

  }
})

export function useStore () {
  return store
}
