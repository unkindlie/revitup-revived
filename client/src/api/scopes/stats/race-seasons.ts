import { api } from '@/api';
import { backendPath } from '@/lib/routing/backend';

import type {
  TPaginatedResponse,
  TResponse,
} from '^/types/response/response.type';
import type {
  TRaceSeasonDetailed,
  TRaceSeasonShort,
} from '^/types/stats/race-seasons';

export async function getRaceSeasons(params?: {
  discipline?: string;
  year?: string;
  page?: number;
  take?: number;
}): Promise<TPaginatedResponse<TRaceSeasonShort>> {
  const resp = await api.get<TPaginatedResponse<TRaceSeasonShort>>(
    backendPath(
      'RaceSeasons',
      {},
      {
        ...params,
        year: params?.year !== 'all' ? params?.year : undefined,
      },
    ),
  );

  return await resp.json();
}

export async function getRaceSeasonById(id: number) {
  const resp = await api.get<TResponse<TRaceSeasonDetailed>>(
    backendPath('RaceSeasonDetailed', { id }),
  );

  return await resp.json();
}
