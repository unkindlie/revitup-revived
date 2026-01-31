import { api } from '..';
import type { TResponse } from '../../../utils/types/response/response.type';
import { backendPath } from '../../lib/routing/backend';
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
