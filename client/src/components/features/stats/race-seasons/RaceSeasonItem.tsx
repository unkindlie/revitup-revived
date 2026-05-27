import { Link } from 'react-router';

import { Typography } from '@/components/common/typography/Typography';
import { Pages, path } from '@/lib/routing/client';

import type { TRaceSeasonShort } from '^/types/stats/race-seasons';

export const RaceSeasonItem = ({
  id,
  seasonYear,
  stages,
  discipline,
}: TRaceSeasonShort) => {
  const { logoUrl, name } = discipline;

  return (
    <Link
      className="flex w-full cursor-pointer items-center space-x-3 rounded-md border-2 p-3"
      to={path(Pages.StatisticsSeasonDetailed, { id })}
    >
      <img className="bg-main size-20 rounded-md p-2" src={logoUrl} />
      <div className="flex flex-col">
        <Typography variant="xl" weight="semibold">
          {seasonYear} {name} Season
        </Typography>
        <Typography>{stages} stages</Typography>
      </div>
    </Link>
  );
};
