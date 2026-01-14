import { createContext, type ReactNode } from 'react';
import { TranslationNamespaces } from '@/lib/translation';

type Namespaces =
  (typeof TranslationNamespaces)[keyof typeof TranslationNamespaces];

// eslint-disable-next-line react-refresh/only-export-components
export const TranslationNamespaceContext = createContext<Namespaces | null>(null);

type TranslationNamespaceProviderProps = {
  children: ReactNode;
  namespace: Namespaces | null;
};

export const TranslationNamespaceProvider = ({
  children,
  namespace,
}: TranslationNamespaceProviderProps) => {
  return (
    <TranslationNamespaceContext.Provider value={namespace}>
      {children}
    </TranslationNamespaceContext.Provider>
  );
};
