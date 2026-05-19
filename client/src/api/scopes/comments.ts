import { api } from '@/api';
import { backendPath } from '@/lib/routing/backend';

import type {
  TCommentCreate,
  TCommentSource,
  TCommentsResponse,
} from '^/types/comments';
import type { TResponse } from '^/types/response/response.type';

export async function getCommentsForEntity(
  entitySource: TCommentSource,
  entityId: number,
): Promise<TResponse<TCommentsResponse>> {
  const resp = await api.get<TResponse<TCommentsResponse>>(
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
