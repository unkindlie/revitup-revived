import { useMutation } from '@tanstack/react-query';
import { createArticle } from '@/api/scopes/articles';
import type { ArticleCreate } from '^/types/articles';
import { toast } from 'sonner';
import { useTranslation } from '../../useTranslation';
import { useNavigate } from 'react-router';
import { path } from '../../../lib/routing/client';

export const useCreateArticle = () => {
  const { t } = useTranslation(['articles']);
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ['article-create'],
    mutationFn: (article: ArticleCreate) => createArticle(article),
    onSuccess: () => {
      toast.success(t('index.draft.success'));
      navigate(path('/articles/draft'));
    },
  });
};
