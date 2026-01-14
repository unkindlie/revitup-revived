import type { TResponse } from '../../types/response/response.type';

export const getDataFromResponse = <T = unknown>(res: TResponse<T>) => res.response.data;

export const getErrorFromResponse = (res: TResponse) => res.response.error!;