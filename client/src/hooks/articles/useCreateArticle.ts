import { useMutation } from '@tanstack/react-query';
import { createArticle } from '@/api/scopes/articles';
import type { ArticleCreate } from '^/types/articles';
import { toast } from 'sonner';

export const useCreateArticle = () =>
  useMutation({
    mutationKey: ['article-create'],
    mutationFn: (article: ArticleCreate) => createArticle(article),
    onSuccess: () => {
      toast.success('Article successfully created');
    },
  });
