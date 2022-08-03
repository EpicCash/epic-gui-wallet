import en from './help_en';
//import zh from './help/zh';
//import ru from './help/ru';

export const help = {
  en: en,
};

export function useHelp(language) {
  if(help[language]){
    return help[language]
  }else{
    return help['en']
  }
}
