import type { TResponse } from '^/types/response/response.type';

export const useGetData = <T = unknown>(res: TResponse<T>) => res.response.data;

export const useGetError = (res: TResponse) => res.response.data;
