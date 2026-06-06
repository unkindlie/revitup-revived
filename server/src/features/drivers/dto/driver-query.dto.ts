import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class DriverQueryDto {
  @IsOptional()
  @IsString()
  discipline?: number;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsNumberString()
  page?: number;

  @IsOptional()
  @IsNumberString()
  take?: number;

  @IsOptional()
  @IsString()
  search?: string;
}
