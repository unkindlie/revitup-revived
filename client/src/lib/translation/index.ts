export const TranslationNamespaces = {
  Common: 'common',
  Auth: 'auth',
} as const;

export type TranslationNamespace =
  (typeof TranslationNamespaces)[keyof typeof TranslationNamespaces];
