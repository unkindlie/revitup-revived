import { Calendar1, MapPinned } from 'lucide-react';
import { useParams } from 'react-router';

import { ErrorDisplay } from '@/components/common/errors/ErrorDisplay';
import { CenteredSpinner } from '@/components/common/spinner/CenteredSpinner';
import { Typography } from '@/components/common/typography/Typography';
import { EventNoBackground } from '@/components/features/events/EventNoBackground';
import { useEventById } from '@/hooks/features/events/useEventById';
import { useResponse } from '@/hooks/useResponse';
import { useTranslation } from '@/hooks/useTranslation';

// Design: to add the photos on the right side for the md-layout
export const EventsDetailedPade = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: eventRes,
    isLoading,
    error: queryError,
  } = useEventById(Number(id ?? 0));
  const { t } = useTranslation(['events']);

  const { data: event } = useResponse(eventRes);

  if (queryError) return <ErrorDisplay error={queryError} />;

  if (isLoading || !event) return <CenteredSpinner />;

  const { title, description, location, startDate, endDate } = event;

  return (
    <div className="flex w-full flex-col">
      <div className="h-24 *:rounded-md md:w-[55%] lg:w-[40%]">
        <EventNoBackground />
      </div>
      <Typography className="mt-3" variant="3xl" weight="semibold">
        {title}
      </Typography>
      <div className="mt-1.5 flex items-center gap-x-1.5 opacity-75">
        <Calendar1 size={22} />
        <Typography>
          {new Date(startDate).toDateString()} -{' '}
          {new Date(endDate).toDateString()}
        </Typography>
      </div>
      <div className="mt-1.5 flex items-center gap-x-1.5 opacity-75">
        <MapPinned size={22} />
        <Typography>{location}</Typography>
      </div>
      <div className="mt-4 flex flex-col rounded-md border-2 px-2 py-1 md:max-w-1/3">
        <Typography variant="xl" weight="semibold">
          {t('detailed.description.title')}
        </Typography>
        <Typography className="mt-1" variant="md">
          {description ?? t('detailed.description.placeholder')}
        </Typography>
      </div>
    </div>
  );
};
