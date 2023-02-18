import en from './help_en';
import de from './help_de';
import fa from './help_fa';

export const help = {
  en: en,
  de: de,
  fa: fa,
};

export function useHelp(language) {
  if(help[language]){
    return help[language]
  }else{
    return help['en']
  }
}
