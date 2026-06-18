import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { TranslationNamespaces } from '@/lib/translation';

import commonEn from '@/assets/locales/en-GB/common.json';
import indexEn from '@/assets/locales/en-GB/index.json';
import authEn from '@/assets/locales/en-GB/auth.json';
import eventsEn from '@/assets/locales/en-GB/events.json';
import threadsEn from '@/assets/locales/en-GB/threads.json';
import statsEn from '@/assets/locales/en-GB/stats.json';
import articlesEn from '@/assets/locales/en-GB/articles.json';
import driversEn from '@/assets/locales/en-GB/drivers.json';
import usersEn from '@/assets/locales/en-GB/users.json';

import commonUk from '@/assets/locales/uk-UA/common.json';
import indexUk from '@/assets/locales/uk-UA/index.json';
import authUk from '@/assets/locales/uk-UA/auth.json';
import eventsUk from '@/assets/locales/uk-UA/events.json';
import threadsUk from '@/assets/locales/uk-UA/threads.json';
import statsUk from '@/assets/locales/uk-UA/stats.json';
import articlesUk from '@/assets/locales/uk-UA/articles.json';
import driversUk from '@/assets/locales/uk-UA/drivers.json';
import usersUk from '@/assets/locales/uk-UA/users.json';

i18n.use(initReactI18next).init({
  fallbackLng: 'en-GB',
  interpolation: {
    escapeValue: false,
  },
  resources: {
    'en-GB': {
      [TranslationNamespaces.Common]: commonEn,
      [TranslationNamespaces.Index]: indexEn,
      [TranslationNamespaces.Auth]: authEn,
      [TranslationNamespaces.Events]: eventsEn,
      [TranslationNamespaces.Threads]: threadsEn,
      [TranslationNamespaces.Statistics]: statsEn,
      [TranslationNamespaces.Articles]: articlesEn,
      [TranslationNamespaces.Drivers]: driversEn,
      [TranslationNamespaces.Users]: usersEn,
    },
    'uk-UA': {
      [TranslationNamespaces.Common]: commonUk,
      [TranslationNamespaces.Index]: indexUk,
      [TranslationNamespaces.Auth]: authUk,
      [TranslationNamespaces.Events]: eventsUk,
      [TranslationNamespaces.Threads]: threadsUk,
      [TranslationNamespaces.Statistics]: statsUk,
      [TranslationNamespaces.Articles]: articlesUk,
      [TranslationNamespaces.Drivers]: driversUk,
      [TranslationNamespaces.Users]: usersUk,
    },
  },
});
