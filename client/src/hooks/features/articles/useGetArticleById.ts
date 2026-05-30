import { useQuery } from '@tanstack/react-query';
import { getArticleById } from '@/api/scopes/articles';

export const useGetArticleById = (id: number) =>
  useQuery({
    queryKey: ['article-detailed', id],
    queryFn: () => getArticleById(id),
  });
