import { useInfiniteQuery } from '@tanstack/react-query';

import { getThreads } from '@/api/scopes/threads';

export const useThreads = () =>
  useInfiniteQuery({
    queryKey: ['threads'],
    queryFn: ({ pageParam = 1 }) => getThreads(pageParam, 15),

    getNextPageParam: (lastPage) => {
      const current = lastPage.response.data?.query.page;
      const total = lastPage.response.data?.query.totalPages;

      return current < total ? current + 1 : undefined;
    },

    initialPageParam: 1,
  });
