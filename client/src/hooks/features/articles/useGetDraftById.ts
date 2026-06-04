import { useQuery } from '@tanstack/react-query';
import { getDraftArticleById } from '../../../api/scopes/articles';

export const useGetDraftById = (id: number) =>
  useQuery({
    queryKey: ['draft-article', id],
    queryFn: () => getDraftArticleById(id),
  });
