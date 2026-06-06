import { useQuery } from '@tanstack/react-query';
import { getRaceSeasons } from '../../../../api/scopes/stats/race-seasons';

export const useRaceSeasons = (params?: {
  discipline?: string;
  year?: string;
  page?: number;
  take?: number;
}) => {
  return useQuery({
    queryKey: ['race-seasons', params],
    queryFn: () => getRaceSeasons(params),
  });
};
