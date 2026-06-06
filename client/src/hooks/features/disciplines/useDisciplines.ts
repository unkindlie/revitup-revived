import { useQuery } from '@tanstack/react-query';

import { getDisciplines } from '@/api/scopes/disciplines';

export const useDisciplines = () =>
  useQuery({
    queryKey: ['disciplines'],
    queryFn: getDisciplines,
  });
