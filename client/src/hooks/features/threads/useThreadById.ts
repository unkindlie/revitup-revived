import { useQuery } from '@tanstack/react-query';

import { getThreadById } from '@/api/scopes/threads';

export const useThreadById = (id: string) =>
  useQuery({
    queryKey: ['thread-detailed', id],
    queryFn: () => getThreadById(id),
  });
