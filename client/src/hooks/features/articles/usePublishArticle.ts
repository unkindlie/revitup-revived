import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { publishArticle } from '../../../api/scopes/articles';

export const usePublishArticle = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => publishArticle(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['article-detailed', id] });
      queryClient.invalidateQueries({ queryKey: ['drafts'] });
      toast.success('Article published');
    },
  });
};
