import Vue from 'vue'
import {createWebHistory, createRouter} from 'vue-router'
import Dashboard from '@/components/Dashboard.vue';
import AddressBook from '@/components/AddressBook.vue';
import Login from '@/components/Login.vue';
import NavBar from '@/components/layout/NavBar.vue';
import AsideMenu from '@/components/layout/AsideMenu.vue';
import Restore from '@/components/Restore.vue';
import Create from '@/components/Create.vue';
import CheckService from '@/components/CheckService.vue';
import HttpReceive from '@/components/HttpReceive.vue';
import HttpSend from '@/components/HttpSend.vue';
import HeaderBar from '@/components/HeaderBar.vue';
import SetupWizard from '@/components/SetupWizard.vue';
import Settings from '@/components/Settings.vue';
import RecheckBalance from '@/components/Check.vue';
import Finalize from '@/components/Finalize.vue';
import Receive from '@/components/Receive.vue';
import Help from '@/components/Help.vue';
import About from '@/components/About.vue';
import Account from '@/components/Account.vue';
import Seed from '@/components/Seed.vue';
import New from '@/components/New.vue';

const routes = [
  {

    meta: {
      title: 'Check Service'
    },
    path: '/',
    name: 'checkService',
    component: CheckService
  },
  {

    meta: {
      title: 'New'
    },
    path: '/new',
    name: 'new',
    component: New
  },
  {

    meta: {
      title: 'Login'
    },
    path: '/login',
    name: 'login',
    component: Login
  },
  {

    meta: {
      title: 'Dashboard'
    },
    path: '/dashboard',
    name: 'dashboard',
    components: {
      default: Dashboard,
      navBar: NavBar,
      asideMenu: AsideMenu,
      headerbar: HeaderBar,
    }
  },
  {

    meta: {
      title: 'Account'
    },
    path: '/account',
    name: 'account',
    components: {
      default: Account,
      navBar: NavBar,
      asideMenu: AsideMenu,
      headerbar: HeaderBar,
    }
  },
  {

    meta: {
      title: 'Help'
    },
    path: '/help',
    name: 'help',
    components: {
      default: Help,
      navBar: NavBar,
      asideMenu: AsideMenu,
      headerbar: HeaderBar,
    }
  },
  {

    meta: {
      title: 'About'
    },
    path: '/about',
    name: 'about',
    components: {
      default: About,
      navBar: NavBar,
      asideMenu: AsideMenu,
      headerbar: HeaderBar,
    }
  },
  {
    meta: {
      title: 'Receive'
    },
    path: '/httpReceive',
    name: 'httpReceive',
    components: {
      default: HttpReceive,
      navBar: NavBar,
      asideMenu: AsideMenu,
      headerbar: HeaderBar,
    }
  },
  {

    meta: {
      title: 'Finalize offline transaction'
    },
    path: '/finalizeTransaction',
    name: 'finalizeTransaction',
    components: {
      default: Finalize,
      navBar: NavBar,
      asideMenu: AsideMenu,
      headerbar: HeaderBar,
    }
  },
  {

    meta: {
      title: 'Import offline transaction'
    },
    path: '/importTransaction',
    name: 'importTransaction',
    components: {
      default: Receive,
      navBar: NavBar,
      asideMenu: AsideMenu,
      headerbar: HeaderBar,
    }
  },
  {
    meta: {
      title: 'Send'
    },
    path: '/httpSend',
    name: 'httpSend',
    components: {
      default: HttpSend,
      navBar: NavBar,
      asideMenu: AsideMenu,
      headerbar: HeaderBar,
    }
  },
  {

    meta: {
      title: 'Addressbook'
    },
    path: '/addressBook',
    name: 'addressBook',
    components: {
      default: AddressBook,
      navBar: NavBar,
      asideMenu: AsideMenu,
      headerbar: HeaderBar,
    }
  },
  {

    meta: {
      title: 'Mnemonic Words'
    },
    path: '/mnemonic',
    name: 'mnemonic',
    components: {
      default: Seed,
      navBar: NavBar,
      asideMenu: AsideMenu,
      headerbar: HeaderBar,
    }
  },
  {

    meta: {
      title: 'Create Wallet'
    },
    path: '/create:from?',
    name: 'create',
    components: {
      default: Create,
    }
  },
  {

    meta: {
      title: 'Restore Wallet'
    },
    path: '/restore/:from?',
    name: 'restore',
    components: {
      default: Restore,
    }
  },
  {

    meta: {
      title: 'Setup Wizard'
    },
    path: '/setupwizard:from?',
    name: 'setupwizard',
    components: {
      default: SetupWizard,
    }
  },
  {

    meta: {
      title: 'Settings'
    },
    path: '/settings',
    name: 'settings',
    components: {
      default: Settings,
      navBar: NavBar,
      asideMenu: AsideMenu,
      headerbar: HeaderBar,
    }
  },
  {

    meta: {
      title: 'Recheck balance'
    },
    path: '/recheckBalance',
    name: 'recheckBalance',
    components: {
      default: RecheckBalance,
      navBar: NavBar,
      asideMenu: AsideMenu,
      headerbar: HeaderBar,
    }
  },



]

export function useRouter () {
  return router
}

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
