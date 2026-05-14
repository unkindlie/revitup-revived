import { useQuery } from '@tanstack/react-query';

import { getEvents } from '@/api/scopes/events';

export const useEvents = (page?: number, take?: number) =>
  useQuery({
    queryKey: ['events', page, take],
    queryFn: () => getEvents(page, take),
  });
