import axios, { AxiosError, type AxiosRequestConfig } from 'axios';
import AuthService from '@/api/services/auth.service';
import { ACCESS_TOKEN } from '../../utils/constants/auth.constants';

// ...existing code...

type RetryableRequest = AxiosRequestConfig & { _retry?: boolean };

let isRefreshing = false;
let refreshSubscribers: Array<(token: string | null) => void> = [];

const subscribeTokenRefresh = (cb: (token: string | null) => void) => {
  refreshSubscribers.push(cb);
};

const onRefreshed = (token: string | null) => {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
};

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URI,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  // fixed: headers is an object, not has setAuthorization()
  if (accessToken) {
    config.headers.hasAuthorization(`Bearer ${accessToken}`)
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  async (err: AxiosError) => {
    const originalRequest: RetryableRequest | undefined = err?.config;

    // guard: don't attempt to refresh if the failing request is the refresh endpoint itself
    const reqUrl = originalRequest?.url ?? '';
    if (reqUrl.includes('/auth/refresh') || reqUrl.includes('refresh')) {
      return Promise.reject(err);
    }

    if (
      err?.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        // queue the request until refresh finishes
        return new Promise((resolve, reject) => {
          subscribeTokenRefresh((token) => {
            if (!token) {
              reject(err);
              return;
            }
            const retryReq = {
              ...originalRequest,
              headers: {
                ...originalRequest.headers,
                Authorization: `Bearer ${token}`,
              },
            };
            resolve(api.request(retryReq));
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshResult = await AuthService.refresh();
        const accessToken =
          refreshResult?.response?.data?.tokens?.accessToken ?? null;

        if (!accessToken) {
          throw new Error('No access token returned from refresh');
        }

        localStorage.setItem(ACCESS_TOKEN, accessToken);
        onRefreshed(accessToken);

        const retryReq = {
          ...originalRequest,
          headers: {
            ...originalRequest.headers,
            Authorization: `Bearer ${accessToken}`,
          },
        };

        return api.request(retryReq);
      } catch (e) {
        onRefreshed(null);
        localStorage.removeItem(ACCESS_TOKEN);
        try {
          await AuthService.logout();
        } catch {
          /* this should be ignored */
        }
        return Promise.reject(e);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(err);
  },
);
