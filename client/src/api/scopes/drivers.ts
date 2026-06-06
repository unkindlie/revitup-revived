import { api } from '..';
import type {
  TPaginatedResponse,
  TResponse,
} from '../../../utils/types/response/response.type';
import { backendPath } from '../../lib/routing/backend';

import type { TDriverShort, TDriverDetailed } from '^/types/drivers';

export async function getDrivers(params?: {
  page?: number;
  take?: number;
  discipline?: number;
  search?: string;
}): Promise<TPaginatedResponse<TDriverShort>> {
  const res = await api.get<TPaginatedResponse<TDriverShort>>(
    backendPath('DriversBase', undefined, {
      page: params?.page ?? 1,
      take: params?.take ?? 12,
      discipline: params?.discipline,
      search: params?.search,
    }),
  );

  return await res.json();
}

export async function getDriverById(
  id: number,
): Promise<TResponse<TDriverDetailed>> {
  const res = await api.get<TResponse<TDriverDetailed>>(
    backendPath('DriverDetailed', { id }),
  );

  return await res.json();
}
