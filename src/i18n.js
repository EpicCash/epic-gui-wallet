
import { createI18n } from 'vue-i18n/index'
import en from './lang/en';
import zh from './lang/zh';
import ru from './lang/ru';
import de from './lang/de';
import fa from './lang/fa';
import bg from './lang/bg';
import cz from './lang/cz';

const messages = {
  en,
  de,
  fa,
  bg,
  cz,
}

export const i18n = createI18n({
  locale: 'en',
  messages
});
