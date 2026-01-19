import { useQuery } from '@tanstack/react-query';
import { getArticles } from '@/api/scopes/articles';

export const useGetArticles = () =>
  useQuery({
    queryKey: ['articles'],
    queryFn: getArticles,
  });
