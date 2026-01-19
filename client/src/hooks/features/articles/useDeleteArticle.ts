import { useMutation } from '@tanstack/react-query';
import { softDeleteArticle } from '@/api/scopes/articles';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

export const useDeleteArticle = (id: string) => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ['article-soft-delete', id],
    mutationFn: () => softDeleteArticle(id),
    onSuccess: () => {
      toast.info('Article is deleted deleted');

      navigate('/');
    },
    onError: (error) => {
      toast.error('Unable to delete the article', {
        description: error.message,
      });
    },
  });
};
