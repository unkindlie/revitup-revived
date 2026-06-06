import { Type } from 'class-transformer';
import { IsOptional, IsString, IsNumber } from 'class-validator';

export class RaceSeasonQuery {
  @IsString()
  @IsOptional()
  discipline: string;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  year?: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  page?: number;

  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  take?: number;
}
