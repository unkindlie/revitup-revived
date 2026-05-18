import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createComment } from '@/api/scopes/comments';

import type { TCommentCreate } from '^/types/comments';

export const useAddComment = (input: TCommentCreate) => {
  const queryClient = useQueryClient();
  const { entitySource, entityId } = input;

  return useMutation({
    mutationKey: ['comment-add'],
    mutationFn: () => createComment(input),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['comments', entitySource, entityId],
      }),
  });
};
