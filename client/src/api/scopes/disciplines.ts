import type { TResponse } from '^/types/response/response.type';
import type { DisciplineShort } from '^/types/disciplines';
import { api } from '@/api';

export async function getDisciplines(): Promise<TResponse<DisciplineShort[]>> {
  const res = await api.get<TResponse<DisciplineShort[]>>('disciplines');

  return res.json();
}
