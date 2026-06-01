import { useParams } from 'react-router';

import { CenteredSpinner } from '@/components/common/spinner/CenteredSpinner';
import { Typography } from '@/components/common/typography/Typography';
import { RaceEventItem } from '@/components/features/stats/race-events/RaceEventItem';
import { useRaceSeasonById } from '@/hooks/features/stats/race-seasons/useRaceSeasonById';
import { useResponse } from '@/hooks/useResponse';
import { useTranslation } from '@/hooks/useTranslation';

export const StatsSeasonDetailed = () => {
  const { id } = useParams();
  const { data: seasonRes, isLoading } = useRaceSeasonById(Number(id || 0));
  const { t } = useTranslation(['stats']);

  const { data: season } = useResponse(seasonRes);

  if (isLoading || !season) return <CenteredSpinner />;

  return (
    <div className="flex flex-col space-y-4 lg:w-3/5">
      <div className="flex items-center space-x-3">
        <img
          className="bg-main size-20 rounded-md p-2"
          src={season.discipline.mainImgUrl}
        />
        <div className="space-y-0.5">
          <Typography variant="2xl" weight="semibold">
            {t('common.namings.season', {
              season: `${season.seasonYear} ${season.discipline.title}`,
            })}
          </Typography>
          <div className="space-x-2">
            <Typography variant="lg">
              {t('common.namings.stages', { count: season.stages })}
            </Typography>
            <Typography
              className="bg-main rounded-xl px-1.5 py-1 text-white"
              weight="semibold"
            >
              {season.discipline.title}
            </Typography>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <Typography variant="2xl" weight="semibold">
          {t('raceEvents.title')}
        </Typography>
        <div className="flex flex-col space-y-2">
          {!season.raceEvents.length && (
            <Typography>{t('raceEvents.noEvents')}</Typography>
          )}
          {season.raceEvents.map((re) => (
            <RaceEventItem key={re.id} {...re} />
          ))}
        </div>
      </div>
    </div>
  );
};
