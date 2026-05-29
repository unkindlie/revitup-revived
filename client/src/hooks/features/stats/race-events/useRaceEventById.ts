import { useQuery } from '@tanstack/react-query';

import { getRaceEventById } from '@/api/scopes/stats/race-events';

export const useRaceEventById = (id: number) =>
  useQuery({
    queryKey: ['race-event', id],
    queryFn: () => getRaceEventById(id),
  });
