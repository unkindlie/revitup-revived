import type { AxiosError } from 'axios';
import type { TResponse } from '../../types/response/response.type';

export function getErrorFromAxiosError(axiosErr: unknown) {
  return (axiosErr as AxiosError).response?.data as TResponse;
}
