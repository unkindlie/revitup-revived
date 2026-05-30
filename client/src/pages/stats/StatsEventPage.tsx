import { Calendar, MapPin } from 'lucide-react';
import { Link, useParams } from 'react-router';

import { CenteredSpinner } from '@/components/common/spinner/CenteredSpinner';
import { Typography } from '@/components/common/typography/Typography';
import { useRaceEventById } from '@/hooks/features/stats/race-events/useRaceEventById';
import { useResponse } from '@/hooks/useResponse';
import { useTranslation } from '@/hooks/useTranslation';
import { Pages, path } from '@/lib/routing/client';

export const StatsEventPage = () => {
  const { id } = useParams();
  const { data: eventRes, isLoading } = useRaceEventById(Number(id || 0));
  const { t } = useTranslation(['stats']);

  const { data: event } = useResponse(eventRes);

  if (isLoading || !event) return <CenteredSpinner />;

  return (
    <div className="flex flex-col space-y-4 lg:w-3/5">
      <div>
        <Typography className="flex" variant="2xl" weight="semibold">
          {event.eventStage}.{' '}
          <Typography className="ml-1" variant="2xl" weight="semibold">
            {event.name}
          </Typography>
        </Typography>
      </div>

      {event.description && (
        <div>
          <Typography>{event.description}</Typography>
        </div>
      )}

      <div className="flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <MapPin />
          <Typography weight="medium">{event.circuit.name}</Typography>
          <Typography className="ml-2">
            {t('common.namings.laps', { count: event.laps })} (
            {Number(event.laps) * event.circuit.length} km)
          </Typography>
        </div>

        <div className="flex items-center">
          <Calendar />
          <Typography className="ml-2">
            {new Date(event.startDate).toDateString()} -{' '}
            {new Date(event.endDate).toDateString()}
          </Typography>
        </div>

        {event.season && (
          <div className="flex items-center space-x-2">
            <Typography>
              {t('common.namings.season', { season: null })}:
            </Typography>
            <Link
              className="flex items-center space-x-1 md:space-x-2"
              to={path(Pages.StatisticsSeasonDetailed, { id: event.season.id })}
            >
              <img
                className="bg-main size-12 rounded-sm p-1"
                src={event.season.discipline.logoUrl}
              />
              <Typography weight="semibold">
                {event.season.seasonYear} {event.season.discipline.title}
              </Typography>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
