import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.yml';
import fr from './locales/fr.yml';

const LANGUAGES : any = {
  en,
  fr,
  // nl,
  // de,
  // it,
  // sp,
  // jp,
  // cn
};

export const languages = Object.keys(LANGUAGES);

let resources : any = {};
languages.forEach(l => resources[l] = {translation: LANGUAGES[l]});

const current = window.localStorage.getItem('lang') || 'en';

i18next
  .use(initReactI18next)
  .init({
    lng: current,
    fallbackLng: 'en',
    resources,

    interpolation: {
      escapeValue: false
    }
  });
