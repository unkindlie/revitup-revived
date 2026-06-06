import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { ArticleEdit } from '../../../../utils/types/articles';
import { updateArticle } from '../../../api/scopes/articles';
import type { Paragraph } from '../../../../utils/types/paragraphs';

export const useEditArticle = (id: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['article-edit', id],

    mutationFn: ({
      article,
      file,
      paragraphs,
    }: {
      article: ArticleEdit;
      file?: File;
      paragraphs?: Paragraph[];
    }) => updateArticle(id, article, file, paragraphs),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['article-detailed', id],
      });
    },
  });
};
