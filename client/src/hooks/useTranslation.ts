import {
  useTranslation as useBaseTranslation,
  type UseTranslationOptions,
} from 'react-i18next';
import type { TranslationNamespace } from '@/lib/translation';

export const useTranslation = (
  values: TranslationNamespace[],
  options?: UseTranslationOptions<undefined>,
) => useBaseTranslation(values, options);
