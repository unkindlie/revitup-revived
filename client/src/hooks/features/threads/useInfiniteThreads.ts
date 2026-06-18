import { useInfiniteQuery } from '@tanstack/react-query';
import { getThreads } from '../../../api/scopes/threads';

export const useInfiniteThreads = () =>
  useInfiniteQuery({
    queryKey: ['threads'],
    queryFn: ({ pageParam }) => getThreads(pageParam, 15),
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.response.data?.query.page < lastPage.response.data?.totalPages
        ? lastPage.response.data?.query?.page + 1
        : undefined,
  });
