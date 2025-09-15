import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEn from '@/assets/locales/en-US/translation.json';

i18n.use(initReactI18next).init({
  fallbackLng: 'en-US',
  interpolation: {
    escapeValue: false,
  },
  resources: {
    'en-US': { translation: translationEn },
  },
});
