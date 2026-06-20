import { api } from '@/api';
import { backendPath } from '@/lib/routing/backend';
import type {
  TPaginatedResponse,
  TResponse,
} from '^/types/response/response.type';
import type {
  TThreadCreate,
  TThreadDetailed,
  TThreadLatest,
  TThreadShort,
} from '^/types/threads';
import type { TThreadsWithCategory } from '^/types/thread-categories';

export async function getThreads(
  page = 1,
  take = 15,
): Promise<TPaginatedResponse<TThreadShort>> {
  const resp = await api.get(backendPath('ThreadBase', {}, { page, take }));

  return await resp.json();
}

export async function getThreadsByCategory(
  categoryCode: string,
): Promise<TResponse<TThreadsWithCategory>> {
  const res = await api.get<TResponse<TThreadShort[]>>(
    backendPath('ThreadBaseByCategory', {
      code: categoryCode,
    }),
  );

  return await res.json();
}

export async function getLatestThreads(): Promise<TResponse<TThreadLatest[]>> {
  const res = await api.get<TResponse<TThreadLatest[]>>(
    backendPath('ThreadsLatest'),
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

export async function createThread(thread: TThreadCreate): Promise<void> {
  await api.post(backendPath('ThreadBase'), {
    json: thread,
  });
}
