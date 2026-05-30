import enFlag from '@/assets/vectors/flags/en-GB.svg';
import ukFlag from '@/assets/vectors/flags/uk-UA.svg';

export const LOCALES = [
  { code: 'en-GB', label: 'English', flag: enFlag },
  { code: 'uk-UA', label: 'Українська', flag: ukFlag },
];

export type LocaleEntry = (typeof LOCALES)[number];
