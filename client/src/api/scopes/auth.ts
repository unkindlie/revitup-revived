import { api } from '@/api';
import type { TResponse } from '^/types/response/response.type';
import type { TAuthBody, TAuthRegister, TAuthResponse } from '^/types/auth';
import { BackendRoutes } from '@/lib/routing/backend';

export async function register(body: TAuthRegister): Promise<void> {
  await api.post(BackendRoutes.AuthRegister, {
    json: body,
  });
}

export async function login(body: TAuthBody): Promise<TResponse<TAuthResponse>> {
  const response = await api.post<TResponse<TAuthResponse>>(
    BackendRoutes.AuthLogin,
    {
      json: body,
    },
  );

  return await response.json();
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
