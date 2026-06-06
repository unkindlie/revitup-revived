import { useQuery } from '@tanstack/react-query';

import { getMyDrafts } from '@/api/scopes/articles';

export const useGetMyDrafts = () =>
  useQuery({
    queryKey: ['my-drafts'],
    queryFn: getMyDrafts,
  });
