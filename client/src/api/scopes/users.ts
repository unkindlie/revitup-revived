import { api } from '@/api';

import { backendPath, BackendRoutes } from '@/lib/routing/backend';

import type { BaseImage } from '^/types/images';
import type { TResponse } from '^/types/response/response.type';
import type { UserDetailed } from '^/types/users';

export async function getUserById(
  id: number,
): Promise<TResponse<UserDetailed>> {
  const response = await api.get<TResponse<UserDetailed>>(
    backendPath('UserById', {
      id,
    }),
  );

  return await response.json();
}

export async function getUserProfileImagesById(
  id: number,
): Promise<TResponse<BaseImage[]>> {
  const response = await api.post<TResponse<BaseImage[]>>(
    BackendRoutes.UserProfileImagesById,
    {
      json: { id },
    },
  );

  return await response.json();
}

export async function getUserLatestPfp(
  id: number,
): Promise<TResponse<string | null>> {
  const resp = await api.get<TResponse<string | null>>(
    backendPath('UserLatestPfp', { id }),
  );

  return await resp.json();
}

export async function uploadUserPfp(
  image: File,
): Promise<TResponse<{ message: string }>> {
  const form = new FormData();
  form.append('image', image);

  const resp = await api.post<TResponse<{ message: string }>>(
    backendPath('UserUploadPfp'),
    {
      body: form,
    },
  );

  return await resp.json();
}
