import { api } from '@/api';
import { backendPath } from '@/lib/routing/backend';

import type {
  TComment,
  TCommentCreate,
  TCommentSource,
} from '^/types/comments';
import type { TResponse } from '^/types/response/response.type';

export async function getCommentsForEntity(
  entitySource: TCommentSource,
  entityId: number,
): Promise<TResponse<TComment[]>> {
  const resp = await api.get<TResponse<TComment[]>>(
    backendPath(
      'CommentsBase',
      {},
      {
        entitySource,
        entityId,
      },
    ),
  );

  return await resp.json();
}

export async function createComment(input: TCommentCreate) {
  await api.post(backendPath('CommentsBase'), { json: input });
}
