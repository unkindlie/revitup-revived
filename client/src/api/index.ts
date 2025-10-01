import axios from 'axios';
import { ACCESS_TOKEN } from '^/constants/auth.constants';
import AuthService from '@/api/services/auth.service';

let isRefreshing = false;

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URI,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});

api.interceptors.response.use(
  (config) => config,
  async (err) => {
    const originalRequest = err.config;
    if (
      err.response &&
      err.response.status === 401 &&
      originalRequest &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        // Wait until the token is refreshed
        return new Promise((resolve) => {
          const interval = setInterval(() => {
            const accessToken = localStorage.getItem(ACCESS_TOKEN);
            if (!isRefreshing && accessToken) {
              clearInterval(interval);
              originalRequest.headers.Authorization = `Bearer ${accessToken}`;
              resolve(api.request(originalRequest));
            }
          }, 100);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const {
          tokens: { accessToken },
        } = await AuthService.refresh().then((result) => result.response.data!);
        localStorage.setItem(ACCESS_TOKEN, accessToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return api.request(originalRequest);
      } catch (e) {
        console.error('Error while refreshing tokens', e);

        localStorage.removeItem(ACCESS_TOKEN);
        await AuthService.logout();

        return Promise.reject(e);
      } finally {
        isRefreshing = false;
      }
    }

    throw err;
  },
);
