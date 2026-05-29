import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class RaceSeasonQuery {
  @IsString()
  @IsOptional()
  discipline: string;

  @IsNumberString()
  @IsOptional()
  year: number;
}
