import { Typography } from '@/components/common/typography/Typography';
import { RaceSeasonItem } from '@/components/features/stats/race-seasons/RaceSeasonItem';
import { useRaceSeasons } from '@/hooks/features/stats/race-seasons/useRaceSeasons';
import { useResponse } from '@/hooks/useResponse';
import { useTranslation } from '@/hooks/useTranslation';

export const StatsSeasonsPage = () => {
  const { data: seasonsRes } = useRaceSeasons();
  const { t } = useTranslation(['stats']);

  const { data: seasons } = useResponse(seasonsRes);

  return (
    <div className="flex w-full flex-col space-y-2">
      <div className="flex flex-col space-y-1">
        <Typography variant="3xl" weight="semibold">
          {t('raceSeasons.title')}
        </Typography>
        <Typography variant="lg">{t('raceSeasons.description')}</Typography>
      </div>
      {seasons && (
        <div className="space-y-3 md:grid md:grid-cols-2 md:space-y-0 md:gap-x-4 lg:grid-cols-3">
          {seasons.map((season) => (
            <RaceSeasonItem key={season.id} {...season} />
          ))}
        </div>
      )}
    </div>
  );
};
