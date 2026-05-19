import { useQuery } from '@tanstack/react-query';

import { getCommentsForEntity } from '@/api/scopes/comments';

import type { TCommentSource } from '^/types/comments';

export const useComments = (
  entitySource: TCommentSource,
  entityId: number,
  inView: boolean = false,
) =>
  useQuery({
    queryKey: ['comments', entitySource, entityId],
    queryFn: () => getCommentsForEntity(entitySource, entityId),
    enabled: inView,
    
  });
