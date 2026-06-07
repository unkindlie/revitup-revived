import { api } from '@/api';

import { backendPath } from '@/lib/routing/backend';

import type { TResponse } from '^/types/response/response.type';

export type SearchResultItem = {
  type: 'article' | 'event' | 'discipline' | 'driver';
  id: string | number;
  title?: string;
  mainImgUrl?: string | null;
};

export async function search(
  q: string,
): Promise<TResponse<SearchResultItem[]>> {
  return await api
    .get<
      TResponse<SearchResultItem[]>
    >(backendPath('Search'), { searchParams: { q } })
    .json();
}

export const fetchItems = async (
  items: Array<{ type: string; id: string | number }>,
): Promise<TResponse<SearchResultItem[]>> => {
  return await api
    .post<
      TResponse<SearchResultItem[]>
    >(backendPath('SearchRecent'), { json: { items } })
    .json();
};
