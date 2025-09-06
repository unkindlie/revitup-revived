import axios from 'axios';
import { ACCESS_TOKEN } from '^/constants/auth.constants';

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URI,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});
