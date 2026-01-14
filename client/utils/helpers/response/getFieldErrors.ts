import type { TError } from '^/types/response/response.type';

export function getFieldErrors<T extends string | number | symbol>(
  err: TError,
) {
  return err.fields as Record<T, string>;
}
