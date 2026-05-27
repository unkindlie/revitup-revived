import { useParams } from 'react-router';

import { CenteredSpinner } from '@/components/common/spinner/CenteredSpinner';
import { Typography } from '@/components/common/typography/Typography';
import { RaceEventItem } from '@/components/features/stats/race-events/RaceEventItem';
import { useRaceSeasonById } from '@/hooks/features/stats/race-seasons/useRaceSeasonById';
import { useResponse } from '@/hooks/useResponse';

export const StatsSeasonDetailed = () => {
  const { id } = useParams();
  const { data: seasonRes, isLoading } = useRaceSeasonById(Number(id || 0));

  const { data: season } = useResponse(seasonRes);

  if (isLoading || !season) return <CenteredSpinner />;

  return (
    <div className="flex flex-col space-y-4 lg:w-3/5">
      <div className="flex items-center space-x-3">
        <img
          className="bg-main size-20 rounded-md p-2"
          src={season.discipline.logoUrl}
        />
        <div className="space-y-0.5">
          <Typography variant="2xl" weight="semibold">
            {season.seasonYear} {season.discipline.name} Season
          </Typography>
          <div className="space-x-2">
            <Typography variant="lg">{season.stages} stages</Typography>
            <Typography
              className="bg-main rounded-xl px-1.5 py-1 text-white"
              weight="semibold"
            >
              {season.discipline.name}
            </Typography>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        <Typography variant="2xl" weight="semibold">
          Race events
        </Typography>
        <div className="flex flex-col space-y-2">
          {!season.raceEvents.length && (
            <Typography>No race events found in this season</Typography>
          )}
          {season.raceEvents.map((re) => (
            <RaceEventItem key={re.id} {...re} />
          ))}
        </div>
      </div>
    </div>
  );
};
