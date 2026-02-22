import { Typography } from '@/components/common/typography/Typography';
import { useTranslation } from '@/hooks/useTranslation';
import { TranslationNamespaces } from '@/lib/translation';

// TODO: add "inCategory" prop
export const NoThreads = () => {
  const { t } = useTranslation([TranslationNamespaces.Threads]);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-2">
      <Typography variant="5xl" weight="semibold">
        {t('index.noThreads.title')}
      </Typography>
      <Typography variant="lg">{t('index.noThreads.message')}</Typography>
    </div>
  );
};
