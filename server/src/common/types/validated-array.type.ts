import { Expose, Type } from 'class-transformer';

import { PaginatedQuery } from 'common/types/pagination.type';

export function ValidatedArray<T>(propObj: Record<string, new () => T>) {
  const propName = Object.keys(propObj)[0];
  const propType = Object.values(propObj)[0];

  class Cls {
    @Expose()
    @Type(() => propType)
    [propName]: T[];

    @Expose()
    count: number;

    @Expose()
    query: PaginatedQuery;
  }

  return Cls;
}
