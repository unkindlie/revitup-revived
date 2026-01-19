import { useQuery } from '@tanstack/react-query';
import { getArticleById } from '@/api/scopes/articles';

export const useGetArticleById = (id: string) =>
  useQuery({
    queryKey: ['article-detailed', id],
    queryFn: () => getArticleById(id),
  });
