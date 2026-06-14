export const TranslationNamespaces = {
  Common: 'common',
  Index: 'index',
  Auth: 'auth',
  Events: 'events',
  Threads: 'threads',
  Statistics: 'stats',
  Articles: 'articles',
  Drivers: 'drivers',
} as const;

export type TranslationNamespace =
  (typeof TranslationNamespaces)[keyof typeof TranslationNamespaces];
