import axios from 'axios';
import { ACCESS_TOKEN } from '^/constants/auth.constants';
import AuthService from './services/auth.service';

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URI,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});

api.interceptors.response.use(
  (config) => config,
  async (err) => {
    const originalRequest = err.config;
    if (err.response.status === 401 && originalRequest) {
      try {
        const {
          tokens: { accessToken },
        } = await AuthService.refresh().then((result) => result.response.data!);
        localStorage.setItem(ACCESS_TOKEN, accessToken);

        return api.request(originalRequest);
      } catch (e) {
        console.error('Error while refreshing tokens', e);

        return Promise.reject(e);
      }
    }

    throw err;
  },
);
