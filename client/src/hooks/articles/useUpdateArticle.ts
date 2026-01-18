import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateArticle } from '@/api/scopes/articles';
import type { ArticleEdit } from '^/types/articles';
import { toast } from 'sonner';

export const useEditArticle = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['article-edit', id],
    mutationFn: (article: ArticleEdit) => updateArticle(id, article),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['article-detailed', id] });
      toast.success('Article successfully edited');
    },
  });
};
