import { api } from '@/api';
import { joinStr } from '@/lib/utils';
import type { TResponse } from '^/types/response/response.type';
import type { TAuthBody, TAuthResponse } from '^/types/auth';

class AuthService {
  private static BASE_URL = '/auth';

  static async login(body: TAuthBody): Promise<TResponse<TAuthResponse>> {
    const res = await api.post<TResponse<TAuthResponse>>(
      joinStr('/', this.BASE_URL, 'login'),
      body,
    );

    return res.data;
  }
  static async refresh(): Promise<TResponse<TAuthResponse>> {
    const res = await api.get<TResponse<TAuthResponse>>(
      joinStr('/', this.BASE_URL, 'refresh'),
    );

    return res.data;
  }
  static async verify(): Promise<TResponse<TAuthResponse>> {
    const res = await api.get<TResponse<TAuthResponse>>(
      joinStr('/', this.BASE_URL, 'verify'),
    );

    return res.data;
  }
}

export default AuthService;
