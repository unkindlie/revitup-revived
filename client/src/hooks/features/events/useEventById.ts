import { useQuery } from '@tanstack/react-query';

import { getEventById } from '@/api/scopes/events';

export const useEventById = (id: number) =>
  useQuery({
    queryKey: ['event-detailed', id],
    queryFn: () => getEventById(id),
  });
