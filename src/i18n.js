
import { createI18n } from 'vue-i18n/index'
import en from './lang/en';
import zh from './lang/zh';
import ru from './lang/ru';

const messages = {
  en,
  ru,
  zh,
}

export const i18n = createI18n({
  locale: 'en',
  messages
});
