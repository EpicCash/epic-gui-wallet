<template>

<div>


  <nav id="navbar-main" class="navbar is-fixed-top"  v-show="isNavBarVisible">
      <div class="navbar-brand no-negative-margin-left">
        <a title="Expand" class="navbar-item is-desktop-icon-only is-hidden-touch jb-aside-toggle" data-target="aside-main">
          <span class="icon"><mdicon name="menu" size="24px" /></span>
        </a>
        <a class="navbar-item is-hidden-desktop jb-aside-mobile-toggle">
          <span class="icon"><i class="mdi mdi-forwardburger mdi-24px"></i></span>
        </a>
        <div class="navbar-item has-control no-left-space">
          <div class="control"><input placeholder="Your Search..." class="input"></div>
        </div>
      </div>
      <div class="navbar-brand is-right">
        <a class="navbar-item is-hidden-desktop jb-aside-right-toggle">
          <span class="icon"><mdicon name="bell" /></span>
        </a>
        <a class="navbar-item is-hidden-desktop jb-navbar-menu-toggle" data-target="navbar-menu">
          <span class="icon"><mdicon name="dots-vertical" /></span>
        </a>
      </div>
      <div class="navbar-menu fadeIn animated faster no-negative-margin-right" id="navbar-menu">
        <div class="navbar-end">
          <div class="navbar-item has-dropdown has-dropdown-with-icons has-divider has-user-avatar is-hoverable">
            <a class="navbar-link is-arrowless">
              <div class="is-user-avatar">
                <img src="../assets/img/max-epic.svg" alt="John Doe">
              </div>
              <div class="is-user-name"><span>Max Epic</span></div>
              <span class="icon"> <mdicon name="chevron-down" /> </span>
            </a>
            <div class="navbar-dropdown">
              <a href="account.html" class="navbar-item">
                <span class="icon"><mdicon name="account" /></span>
                <span>My Account</span>
              </a>
              <a href="settings.html" class="navbar-item">
                <span class="icon"><mdicon name="cog" /></span>
                <span>Settings</span>
              </a>
              <a href="proof-address.html" class="navbar-item">
                <span class="icon"><mdicon name="security-network" /></span>
                <span>Proof Address</span>
              </a>
              <a href="recheck-balance.html" class="navbar-item">
                <span class="icon"><mdicon name="sync" /></span>
                <span>Recheck Balance</span>
              </a>
              <a href="mnemonic-words.html" class="navbar-item">
                <span class="icon"><mdicon name="spellcheck" /></span>
                <span>Mnemonic Words</span>
              </a>

              <hr class="navbar-divider">
              <a href="/index.html" class="navbar-item">
                <span class="icon"><mdicon name="logout" /></span>
                <span>Log Out</span>
              </a>
            </div>
          </div>

          <a title="Updates" class="navbar-item has-divider is-desktop-icon-only jb-aside-right-toggle">
            <span class="icon has-update-mark"><mdicon name="bell" /></span>
            <span>Updates</span>
          </a>
        </div>
      </div>
    </nav>

    <aside id="aside-main" class="aside is-placed-left is-expanded">
      <div class="aside-tools">
        <div class="aside-tools-label">
          <img src="../assets/img/epiccash-brand.png" style="width: 25px; margin-top: 13px;">
        </div>
      </div>
      <div class="menu-container jb-has-perfect-scrollbar">
        <div class="menu is-menu-main">
          <p class="menu-label">General</p>
          <ul class="menu-list">
            <li>
              <a href="dashboard.html" class="has-icon is-active">
                <span class="icon"><mdicon name="desktop-mac" /></span>
                <span class="menu-item-label">Dashboard</span>
              </a>
            </li>
            <li>
              <a href="address-book.html" class="has-icon">
                <span class="icon"><mdicon name="book-open-outline" /></span>
                <span class="menu-item-label">Address Book</span>
              </a>
            </li>
          </ul>
          <p class="menu-label">SEND</p>
          <ul class="menu-list">
            <li>
              <a href="create-transaction.html" class="has-icon">
                <span class="icon has-update-mark"><mdicon name="basket-unfill" /></span>
                <span class="menu-item-label">Create transaction [File]</span>
              </a>
            </li>
            <li>
              <a href="finalize-transaction.html" class="has-icon">
                <span class="icon"><mdicon name="basket" /></span>
                <span class="menu-item-label">Finalize transaction [File]</span>
              </a>
            </li>
            <li>
              <a href="send-via-internet.html" class="has-icon">
                <span class="icon"><mdicon name="package-up" /></span>
                <span class="menu-item-label">Send via [http//https]</span>
              </a>
            </li>
          </ul>


          <p class="menu-label">RECEIVE</p>
          <ul class="menu-list">
            <li>
              <a href="import-transaction.html" class="has-icon">
                <span class="icon"><mdicon name="basket-fill" /></span>
                <span class="menu-item-label">Import transaction [File]</span>
              </a>
            </li>
            <li>
              <a href="receive-via-internet.html" class="has-icon">
                <span class="icon"><mdicon name="package-down" /></span>
                <span class="menu-item-label">Receive via [http//https]</span>
              </a>
            </li>
          </ul>
          <p class="menu-label">MISC</p>
          <ul class="menu-list">
            <li>
              <a href="about.html" class="has-icon">
                <span class="icon"><mdicon name="information-outline" /></span>
                <span class="menu-item-label">About</span>
              </a>
            </li>
            <li>
              <a href="help.html" class="has-icon">
                <span class="icon"><mdicon name="account-question-outline" /></span>
                <span class="menu-item-label">Help</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="menu is-menu-bottom">
        <ul class="menu-list">
          <li>
            <a href="/index.html" title="Log out" class="has-icon is-state-info is-hoverable">

              <span class="icon"><mdicon name="logout" /></span>
              <span class="menu-item-label">Log out</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>

</div>



</template>


<script>

const log = window.log
import { ref } from 'vue';

export default {
  name: "dashboard",
  components: {

  },
  data() {
    return {

    }
  },
  setup() {
    

    return {



    }

  },
  created(){

  },

  methods(){




  }
}

</script>
