import { CircleX } from 'lucide-react';

import { Typography } from '@/components/common/typography/Typography';
import { useTranslation } from '@/hooks/useTranslation';
import { TranslationNamespaces } from '@/lib/translation';

export const NoArticlesAvailable = () => {
  const { t } = useTranslation([TranslationNamespaces.Index]);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-2">
      <CircleX className="size-36 lg:size-52" />
      <div className="flex flex-col items-center gap-y-1">
        <Typography variant="4xl" weight="semibold">
          {t('start.noArticlesMsg.title')}
        </Typography>
        <Typography variant="xl">
          {t('start.noArticlesMsg.description')}
        </Typography>
      </div>
    </div>
  );
};
