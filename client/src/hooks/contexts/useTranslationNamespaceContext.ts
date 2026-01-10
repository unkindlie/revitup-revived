import { useContext } from 'react';
import { TranslationNamespaceContext } from '@/contexts/TranslationNamespaceContext';

export const useTranslationNamespaceContext = () => {
  const namespace = useContext(TranslationNamespaceContext);
  if (namespace === null) {
    throw new Error(
      'Translation namespace values should be passed to the TranslationNamespaceProvider',
    );
  }

  return namespace;
};
