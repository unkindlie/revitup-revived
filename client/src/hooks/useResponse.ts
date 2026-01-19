import type { TResponse } from '^/types/response/response.type';

export const useResponse = <T = unknown>(res?: TResponse<T>) => {
  const data = null;
  const error = null;

  if (res?.response.data) return { data: res.response.data, error };

  if (res?.response.error) return { data, error: res.response.error };

  return { data, error };
};

export const getResponse = <T = unknown>(res?: TResponse<T>) => {
  const data = null;
  const error = null;

  if (res?.response.data) return { data: res.response.data, error };

  if (res?.response.error) return { data, error: res.response.error };

  return { data, error };
};
