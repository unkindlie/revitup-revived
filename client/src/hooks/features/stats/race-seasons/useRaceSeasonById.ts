import { useQuery } from '@tanstack/react-query';

import { getRaceSeasonById } from '@/api/scopes/stats/race-seasons';

export const useRaceSeasonById = (id: number) =>
  useQuery({
    queryKey: ['race-season', id],
    queryFn: () => getRaceSeasonById(id),
  });
