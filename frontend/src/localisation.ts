import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.yml';

const languages : any = {
  en,
};

let resources : any = {};
Object.keys(languages)
  .forEach(l => resources[l] = {translation: languages[l]});

i18next
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    resources,

    interpolation: {
      escapeValue: false
    }
  });
