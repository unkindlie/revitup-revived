import { useNavigate } from 'react-router';

import { Typography } from '@/components/common/typography/Typography';
import { useTranslation } from '@/hooks/useTranslation';
import { Pages } from '@/lib/routing/client';

const StatAreaNav = ({
  title,
  description,
  route,
}: {
  title: string;
  description: string;
  route: string;
}) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex w-full cursor-pointer flex-col items-center space-y-1 rounded-md border-2 py-2 *:select-none"
      onClick={() => navigate(route)}
    >
      <Typography variant="2xl" weight="semibold">
        {title}
      </Typography>
      <Typography variant="lg">{description}</Typography>
    </div>
  );
};

export const StatsBasePage = () => {
  const { t } = useTranslation(['stats']);

  return (
    <div className="flex w-full flex-col space-y-1">
      <Typography variant="3xl" weight="semibold">
        {t('base.title')}
      </Typography>
      <Typography variant="lg">{t('base.description')}</Typography>
      <div className="mt-2 flex flex-col md:grid md:grid-cols-2">
        <StatAreaNav
          title={t('base.options.seasons.title')}
          description={t('base.options.seasons.description')}
          route={Pages.StatisticsSeasons}
        />
      </div>
    </div>
  );
};
