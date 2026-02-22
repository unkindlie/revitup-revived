export const TranslationNamespaces = {
  Common: 'common',
  Auth: 'auth',
  Threads: 'threads',
} as const;

export type TranslationNamespace =
  (typeof TranslationNamespaces)[keyof typeof TranslationNamespaces];
