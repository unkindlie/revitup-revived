import { api } from '@/api';
import { backendPath } from '@/lib/routing/backend';

import type { TResponse } from '^/types/response/response.type';
import type { TRaceEventDetailed } from '^/types/stats/race-events';

export async function getRaceEventById(
  id: number,
): Promise<TResponse<TRaceEventDetailed>> {
  const resp = await api.get<TResponse<TRaceEventDetailed>>(
    backendPath('RaceEventDetailed', { id }),
  );

  return await resp.json();
}
