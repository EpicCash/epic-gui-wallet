
import { createI18n } from 'vue-i18n/index'
import en from './lang/en';
import zh from './lang/zh';
import ru from './lang/ru';
import de from './lang/de';
import fa from './lang/fa';

const messages = {
  en,
  de,
  fa,
}

export const i18n = createI18n({
  locale: 'en',
  messages
});
