import { SquaredLogo } from '@/components/common/logos';
import { Typography } from '@/components/common/typography/Typography';
import { useTranslation } from '@/hooks/useTranslation';
import { TranslationNamespaces } from '@/lib/translation';

export const EventNoBackground = () => {
  const { t } = useTranslation([TranslationNamespaces.Events]);

  return (
    <div className="bg-main flex h-full w-full items-center justify-center gap-x-3.5 rounded-t-md">
      <SquaredLogo className="size-[4.5rem] fill-white" />
      <Typography className="text-white" variant="3xl" weight="bold">
        {t('index.card.noBg')}
      </Typography>
    </div>
  );
};
