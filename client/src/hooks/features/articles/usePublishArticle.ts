import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { publishArticle } from '../../../api/scopes/articles';
import { useTranslation } from '../../useTranslation';

export const usePublishArticle = (id: number) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation(['articles']);

  return useMutation({
    mutationFn: () => publishArticle(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['article-detailed', id] });
      queryClient.invalidateQueries({ queryKey: ['drafts'] });
      toast.success(t('draftEdit.actions.publish.success'));
    },
  });
};
