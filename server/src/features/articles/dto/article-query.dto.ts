import { Expose, Transform, Type } from 'class-transformer';
import { IsOptional, IsPositive, IsString } from 'class-validator';

export class ArticleQueryDto {
  @Expose()
  @Type(() => Number)
  @Transform(({ value }) => (value as number) || 1)
  @IsOptional()
  @IsPositive()
  page?: number;

  @Expose()
  @Type(() => Number)
  @Transform(({ value }) => (value as number) || 10)
  @IsOptional()
  @IsPositive()
  take?: number;

  @Expose()
  @IsOptional()
  @IsString()
  search?: string;
}
