


import { createApp } from 'vue'
import { createI18n } from 'vue-i18n/index'


import App from './App.vue'
import mitt from 'mitt';

import './assets/css/animate.css';
import './assets/css/bulma.min.css'


import en from './lang/en';
import zh from './lang/zh';
import ru from './lang/ru';
export const locale = "en";
const messages = {
  en,
  ru,
  zh,
}
import walletService from './shared/wallet.js';
import dbService from './db.js';





const emitter = mitt();
const app = createApp(App);
const i18n = createI18n({
  locale: locale,
  //locale: 'ru',
  messages
})

app.use(i18n);
app.config.globalProperties.$walletService = new walletService();
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
