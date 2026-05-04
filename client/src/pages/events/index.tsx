import { Typography } from '@/components/common/typography/Typography';
import { useTranslation } from '@/hooks/useTranslation';
import { TranslationNamespaces } from '@/lib/translation';

export const EventsPage = () => {
  const { t } = useTranslation([TranslationNamespaces.Events]);

  return (
    <>
      <Typography variant="3xl" weight="semibold">
        {t('index.title')}
      </Typography>
    </>
  );
};
