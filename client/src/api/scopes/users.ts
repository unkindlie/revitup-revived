import { api } from '..';
import type { TResponse } from '../../../utils/types/response/response.type';
import { backendPath, BackendRoutes } from '../../lib/routing/backend';
import type { UserDetailed } from '^/types/users';
import type { BaseImage } from '^/types/images';

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
