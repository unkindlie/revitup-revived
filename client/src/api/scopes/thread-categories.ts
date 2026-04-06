import { api } from '@/api';
import { BackendRoutes } from '@/lib/routing/backend';

import type { TResponse } from '^/types/response/response.type';
import type { TThreadCategoryShort } from '^/types/thread-categories';

export async function getThreadCategories(): Promise<
  TResponse<TThreadCategoryShort[]>
> {
  const response = await api.get<TResponse<TThreadCategoryShort[]>>(
    BackendRoutes.ThreadCategoryBase,
  );

  return await response.json();
}
