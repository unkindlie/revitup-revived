import { Calendar, MapPin } from 'lucide-react';
import { Link } from 'react-router';

import { Typography } from '@/components/common/typography/Typography';
import { Pages, path } from '@/lib/routing/client';

import type { TRaceEventShort } from '^/types/stats/race-events';
import { useTranslation } from '../../../../hooks/useTranslation';

export const RaceEventItem = ({
  id,
  name,
  eventStage,
  laps,
  circuit,
  startDate,
  endDate,
}: TRaceEventShort) => {
  const { t } = useTranslation(['stats']);

  return (
    <Link
      className="flex w-full cursor-pointer flex-col space-y-1 rounded-md border-2 p-3"
      to={path(Pages.StatisticsRaceDetailed, { id })}
    >
      <Typography className="flex" variant="xl">
        {eventStage}.{' '}
        <Typography className="ml-1" variant="xl" weight="semibold">
          {name}
        </Typography>
      </Typography>
      <div className="flex space-x-1">
        <MapPin />
        <Typography weight="medium">{circuit.name}</Typography>
        <Typography className="ml-2">
          {t('common.namings.laps', { count: laps })} (
          {(laps * circuit.length).toFixed(3)} km)
        </Typography>
      </div>
      <div className="flex">
        <Calendar />
        <Typography className="ml-1">
          {new Date(startDate).toDateString()} -{' '}
          {new Date(endDate).toDateString()}
        </Typography>
      </div>
    </Link>
  );
};
