import { Expose, Transform, Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginatedQuery {
  @Expose()
  @Type(() => Number)
  @Transform(({ value }) => (value as number) ?? 1)
  @IsOptional()
  @IsPositive()
  page?: number;

  // TODO: default take will be in the user's settings
  @Expose()
  @Type(() => Number)
  @IsPositive()
  take: number;
}
