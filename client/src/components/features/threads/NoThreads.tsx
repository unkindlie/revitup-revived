import { Typography } from '@/components/common/typography/Typography';
import { useTranslation } from '@/hooks/useTranslation';
import { TranslationNamespaces } from '@/lib/translation';

export const NoThreads = ({ inCategory = false }: { inCategory?: boolean }) => {
  const { t } = useTranslation([TranslationNamespaces.Threads]);
  const part = inCategory ? 'inCategory' : 'default';

  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-2">
      <Typography variant="5xl" weight="semibold">
        {t(`index.noThreads.${part}.title`)}
      </Typography>
      <Typography variant="lg">
        {t(`index.noThreads.${part}.message`)}
      </Typography>
    </div>
  );
};
