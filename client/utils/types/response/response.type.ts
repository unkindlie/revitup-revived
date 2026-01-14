export type TError = {
  name: string;
  message: string;
  fields?: Record<string, string>;
};

export type TSuccessResponse<T = unknown> = { data: T; error: null };

export type TErrorResponse = {
  data: null;
  error: TError;
};

export type TResponse<T = unknown> = {
  statusCode: number;
  path: string;
  date: Date;
} & { response: TSuccessResponse<T> | TErrorResponse };
