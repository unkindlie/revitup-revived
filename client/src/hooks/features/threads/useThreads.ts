import { useQuery } from '@tanstack/react-query';

import { getThreads } from '@/api/scopes/threads';

export const useThreads = () =>
  useQuery({
    queryKey: ['threads-index'],
    queryFn: getThreads,
    refetchInterval: 30000,
  });
