import { Calendar1 } from 'lucide-react';
import { Link, useNavigate } from 'react-router';

import { Typography } from '@/components/common/typography/Typography';
import { EventNoBackground } from '@/components/features/events/EventNoBackground';
import { Pages, path } from '@/lib/routing/client';

import type { TEventShort } from '^/types/events';

export const EventCard = (event: TEventShort) => {
  const navigate = useNavigate();

  const { id, title, startDate, endDate } = event;

  return (
    <div
      className="flex cursor-pointer flex-col gap-y-1 rounded-md border-2 transition-all hover:shadow-lg lg:w-full"
      onClick={() => navigate(path(Pages.EventDetailed, { id }))}
    >
      <div className="h-24 w-full">
        <EventNoBackground />
      </div>
      <div className="flex flex-col gap-y-1 px-3 pt-2 pb-3">
        <Link to={path(Pages.EventDetailed, { id })}>
          <Typography variant="xl" weight="semibold">
            {title}
          </Typography>
        </Link>
        <div className="flex items-center gap-x-1.5 opacity-75">
          <Calendar1 size={22} />
          <Typography>
            {new Date(startDate).toDateString()} -{' '}
            {new Date(endDate).toDateString()}
          </Typography>
        </div>
      </div>
    </div>
  );
};
