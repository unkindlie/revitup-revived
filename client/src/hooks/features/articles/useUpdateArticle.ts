import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import type { ArticleEdit } from '^/types/articles';
import { updateArticle } from '@/api/scopes/articles';

export const useEditArticle = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['article-edit', id],

    mutationFn: ({ article, file }: { article: ArticleEdit; file?: File }) =>
      updateArticle(id, article, file),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['article-detailed', id],
      });
      queryClient.invalidateQueries({
        queryKey: ['draft-article', id],
      });
    },
  });
};
