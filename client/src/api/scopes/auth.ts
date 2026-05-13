import { api } from '@/api';
import type { TResponse } from '^/types/response/response.type';
import type { TAuthBody, TAuthRegister, TAuthResponse } from '^/types/auth';
import { BackendRoutes } from '@/lib/routing/backend';
import { HTTPError } from 'ky';
import { ApiError } from '../../../utils/errors/api.error';

export async function register(body: TAuthRegister): Promise<void> {
  await api.post(BackendRoutes.AuthRegister, {
    json: body,
  });
}

export async function login(
  body: TAuthBody,
): Promise<TResponse<TAuthResponse>> {
  try {
    const response = await api.post<TResponse<TAuthResponse>>(
      BackendRoutes.AuthLogin,
      {
        json: body,
      },
    );

    return await response.json();
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

export async function logout(): Promise<void> {
  await api.post(BackendRoutes.AuthLogout);
}

export async function refresh(): Promise<TResponse<TAuthResponse>> {
  const response = await api.get<TResponse<TAuthResponse>>(
    BackendRoutes.AuthRefresh,
  );

  return await response.json();
}

export async function requestPasswordReset(email: string): Promise<TResponse> {
  const response = await api.post(BackendRoutes.AuthChangePassword, {
    json: { email },
  });

  return await response.json();
}
