import { useQuery } from '@tanstack/react-query';
import { getArticles } from '@/api/scopes/articles';

export const useGetArticles = (page: number = 1, take: number = 10) =>
  useQuery({
    queryKey: ['articles'],
    queryFn: () => getArticles({ page, take }),
  });
