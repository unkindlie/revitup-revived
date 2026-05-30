export type TError = {
  name: string;
  message: string;
  fields?: Record<string, string>;
};

export type TSuccessResponse<T> = { data: T; error: null };

export type TErrorResponse = {
  data: null;
  error: TError;
};

export type TResponse<T> = {
  statusCode: number;
  path: string;
  date: Date;
} & { response: TSuccessResponse<T> | TErrorResponse };

export type TPaginatedResponse<T> = TResponse<{
  items: T[];
  totalCount: number;
  query: {
    page: number;
    take: number;
    totalPages: number;
  };
}>;
