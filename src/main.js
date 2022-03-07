


import { createApp } from 'vue'
import { createI18n } from 'vue-i18n/index'
import walletService from './shared/walletService.js';
import nodeService from './shared/nodeService.js';
import configService from './shared/configService.js';
import {words} from './shared/words.js';
import dbService from './db.js';
import App from './App.vue'
import mitt from 'mitt';
import moment from 'moment'

//import './assets/css/animate.css';
//import './assets/css/bulma.min.css'
import './assets/css/main-styles.scss';
import './assets/css/animate.css';
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
  locale: 'en',
  messages
})

app.use(i18n);

let config = new configService(emitter);

app.config.globalProperties.$walletService = new walletService(emitter, config);
app.config.globalProperties.$nodeService = new nodeService(emitter, config);
app.config.globalProperties.configService = config;
app.config.globalProperties.$dbService = dbService;
app.config.globalProperties.mnemonicWords = words;
app.config.globalProperties.langs = {'en':'English', 'ru':'Russian', 'zh': 'Chinese'}
app.config.globalProperties.$filters = {
  datetimeFormat(date) {
    return moment(date).format('YYYY-MM-DD, hh:mm:ss')
  },
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
