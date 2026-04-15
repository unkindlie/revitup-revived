import { useQuery } from '@tanstack/react-query';

import { getThreadCategories } from '@/api/scopes/thread-categories';

export const useThreadCategories = () =>
  useQuery({
    queryKey: ['thread-categories'],
    queryFn: getThreadCategories,
  });
