import { HTTPError } from 'ky';

import { api } from '@/api';
import { backendPath } from '@/lib/routing/backend';

import { ApiError } from '^/errors/api.error';
import type { TEventCreate, TEventDetailed, TEventShort } from '^/types/events';
import type {
  TPaginatedResponse,
  TResponse,
} from '^/types/response/response.type';

export async function getEvents(
  page: number = 1,
  take: number = 10,
): Promise<TPaginatedResponse<TEventShort>> {
  const events = await api.get<TResponse<TEventShort[]>>(
    backendPath('EventsBase', undefined, { page, take }),
  );

  return await events.json();
}

export async function getEventById(id: number) {
  try {
    const event = await api.get<TResponse<TEventDetailed>>(
      backendPath('EventDetailed', { id }),
    );

    return await event.json();
  } catch (e) {
    if (e instanceof HTTPError) {
      const resp = e.response;

      const body = await resp.json<TResponse<never>>();

      throw new ApiError(
        body.response.error?.message ?? 'Unknown Error',
        body.statusCode,
        body.response.error,
      );
    }

    throw e;
  }
}

export async function createEvent(input: TEventCreate): Promise<void> {
  const body = new FormData();

  Object.entries(input).forEach(([key, val]) => {
    if (val instanceof FileList) {
      if (val.length > 0) {
        body.append(key, val[0]);
      }
      return;
    }

    if (['startDate', 'endDate'].includes(key) && val instanceof Date) {
      body.append(key, val.toISOString());
      return;
    }

    body.append(
      key,
      val as keyof Omit<TEventCreate, 'mainImage' | 'startDate' | 'endDate'>,
    );
  });

  await api.post(backendPath('EventsBase'), { body });
}
