import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { TranslationNamespaces } from '@/lib/translation';

import commonEn from '@/assets/locales/en-US/common.json';
import authEn from '@/assets/locales/en-US/auth.json';

i18n.use(initReactI18next).init({
  fallbackLng: 'en-US',
  interpolation: {
    escapeValue: false,
  },
  resources: {
    'en-US': {
      [TranslationNamespaces.Common]: commonEn,
      [TranslationNamespaces.Auth]: authEn,
    },
  },
});
