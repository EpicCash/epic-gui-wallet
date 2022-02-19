


import { createApp } from 'vue'
import { createI18n } from 'vue-i18n/index'
import { locale } from './shared/config.js';
import walletService from './shared/wallet.js';
import nodeService from './shared/node.js';
import dbService from './db.js';
import App from './App.vue'
import mitt from 'mitt';

import './assets/css/animate.css';
import './assets/css/bulma.min.css'


import en from './lang/en';
import zh from './lang/zh';
import ru from './lang/ru';

const messages = {
  en,
  ru,
  zh,
}

const emitter = mitt();
const app = createApp(App);
const i18n = createI18n({
  locale: locale,
  messages
})

app.use(i18n);
app.config.globalProperties.$walletService = new walletService();
app.config.globalProperties.$nodeService = new nodeService();
app.config.globalProperties.$dbService = dbService;
app.config.globalProperties.$filters = {
  truncate(text, length) {
    if (text.length > length) {
        return text.substring(0, length);
    } else {
        return text;
    }
  },

}
app.config.globalProperties.emitter = emitter;
app.mount('#app');
