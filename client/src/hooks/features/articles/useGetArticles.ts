import { useQuery } from '@tanstack/react-query';
import { getArticles } from '@/api/scopes/articles';

export const useGetArticles = (
  page: number = 1,
  take: number = 10,
  search?: string,
) =>
  useQuery({
    queryKey: ['articles', page, take, search],
    queryFn: () => getArticles({ page, take, search }),
  });
