import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from 'react';
import i18n from 'i18next';
import { LOCALES } from '@/lib/translation/locales';

type LanguageContextProps = {
  locale: string;
  setLocale: (l: string) => void;
};

const LOCALE_STORAGE_KEY = 'locale';

const initialState = {
  locale: LOCALES[0].code,
  setLocale: () => null,
};

export const LanguageContext =
  createContext<LanguageContextProps>(initialState);

export const LanguageProvider = ({ children }: PropsWithChildren) => {
  const available = LOCALES.map((l) => l.code);

  const [locale, setLocaleState] = useState<string>(() => {
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (stored && available.includes(stored)) return stored;

    const nav = navigator.language || '';
    const matched = available.find((a) => nav.startsWith(a.split('-')[0]));
    return matched ?? LOCALES[0].code;
  });

  useEffect(() => {
    i18n.changeLanguage(locale).catch(() => {});
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  }, [locale]);

  const setLocale = (l: string) => {
    if (!available.includes(l)) return;
    setLocaleState(l);
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
};
