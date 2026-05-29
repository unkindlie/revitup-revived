import { api } from '@/api';
import { backendPath } from '@/lib/routing/backend';

import type { TResponse } from '^/types/response/response.type';
import type {
  TRaceSeasonDetailed,
  TRaceSeasonShort,
} from '^/types/stats/race-seasons';

export async function getRaceSeasons(): Promise<TResponse<TRaceSeasonShort[]>> {
  const resp = await api.get<TResponse<TRaceSeasonShort[]>>(
    backendPath('RaceSeasons'),
  );

  return await resp.json();
}

export async function getRaceSeasonById(id: number) {
  const resp = await api.get<TResponse<TRaceSeasonDetailed>>(
    backendPath('RaceSeasonDetailed', { id }),
  );

  return await resp.json();
}
