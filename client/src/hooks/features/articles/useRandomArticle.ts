import { useQuery } from '@tanstack/react-query';
import { getRandomArticle } from '../../../api/scopes/articles';

export const useRandomArticle = () =>
  useQuery({
    queryKey: ['article-random'],
    queryFn: getRandomArticle,
    refetchOnWindowFocus: false,
  });
