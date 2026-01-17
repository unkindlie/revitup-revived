import ky, { HTTPError } from 'ky';
import AuthService from '@/api/services/auth.service';
import { ACCESS_TOKEN } from '^/constants/auth.constants';

let isRefreshing = false;
let refreshSubscribers: Array<(token: string | null) => void> = [];

const subscribeTokenRefresh = (cb: (token: string | null) => void) => {
  refreshSubscribers.push(cb);
};

const onRefreshed = (token: string | null) => {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
};

const api = ky.create({
  prefixUrl: import.meta.env.VITE_BACKEND_URI,
  credentials: 'include',
  hooks: {
    beforeRequest: [
      (request) => {
        const accessToken = localStorage.getItem(ACCESS_TOKEN);
        if (accessToken) {
          request.headers.set('Authorization', `Bearer ${accessToken}`);
        }
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        if (response.status !== 401) return;

        // Don't refresh on refresh endpoint itself
        if (
          request.url.includes('/auth/refresh') ||
          request.url.includes('refresh')
        ) {
          throw new HTTPError(response, request, options);
        }

        if (isRefreshing) {
          // Wait for refresh to finish, then retry
          return new Promise<Response>((resolve, reject) => {
            subscribeTokenRefresh(async (token) => {
              if (!token) {
                reject(new HTTPError(response, request, options));
                return;
              }
              try {
                const retryResponse = await ky(request, {
                  ...options,
                  headers: {
                    ...options.headers,
                    Authorization: `Bearer ${token}`,
                  },
                });
                resolve(retryResponse);
              } catch (e) {
                reject(e);
              }
            });
          });
        }

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

          // Retry original request with new token
          return ky(request, {
            ...options,
            headers: {
              ...options.headers,
              Authorization: `Bearer ${accessToken}`,
            },
          });
        } catch (e) {
          onRefreshed(null);
          localStorage.removeItem(ACCESS_TOKEN);
          try {
            await AuthService.logout();
          } catch {
            /* ignore */
          }
          throw e;
        } finally {
          isRefreshing = false;
        }
      },
    ],
  },
});

export { api as kyApi };
