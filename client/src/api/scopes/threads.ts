import { api } from '@/api';
import { backendPath, BackendRoutes } from '@/lib/routing/backend';
import type { TResponse } from '^/types/response/response.type';
import type { TThreadDetailed, TThreadShort } from '^/types/threads';

export async function getThreads(): Promise<TResponse<TThreadShort[]>> {
  const res = await api.get<TResponse<TThreadShort[]>>(
    BackendRoutes.ThreadBase,
  );

  return await res.json();
}

export async function getThreadById(
  id: string,
): Promise<TResponse<TThreadDetailed>> {
  const res = await api.get<TResponse<TThreadDetailed>>(
    backendPath(`ThreadDetailed`, {
      id,
    }),
  );

  return await res.json();
}
