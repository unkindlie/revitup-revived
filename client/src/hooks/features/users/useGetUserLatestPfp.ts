import { useQuery } from '@tanstack/react-query';

import { getUserLatestPfp } from '@/api/scopes/users';

export const useGetUserLatestPfp = (id: number) =>
  useQuery({
    queryKey: ['user-latest-pfp', id],
    queryFn: () => getUserLatestPfp(id),
  });
