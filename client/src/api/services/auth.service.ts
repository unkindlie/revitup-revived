import { api } from '@/api';
import type { TResponse } from '^/types/response/response.type';
import type { TAuthBody, TAuthResponse } from '^/types/auth';
import { BackendRoutes } from '@/lib/routing/backend';

class AuthService {
  static async login(body: TAuthBody): Promise<TResponse<TAuthResponse>> {
    const { data } = await api.post<TResponse<TAuthResponse>>(
      BackendRoutes.AuthLogin,
      body,
    );

    return data;
  }
  static async logout(): Promise<void> {
    await api.post(BackendRoutes.AuthLogout);
  }
  static async refresh(): Promise<TResponse<TAuthResponse>> {
    const { data } = await api.get<TResponse<TAuthResponse>>(
      BackendRoutes.AuthRefresh,
    );

    return data;
  }

  static async requestPasswordReset(email: string) {
    const { data } = await api.post(BackendRoutes.AuthChangePassword, {
      email,
    });

    return data;
  }
}

export default AuthService;
