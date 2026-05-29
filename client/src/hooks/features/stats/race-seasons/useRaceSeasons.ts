import { useQuery } from '@tanstack/react-query';

import { getRaceSeasons } from '@/api/scopes/stats/race-seasons';

export const useRaceSeasons = () =>
  useQuery({
    queryKey: ['race-seasons'],
    queryFn: getRaceSeasons,
  });
