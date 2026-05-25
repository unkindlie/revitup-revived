import { Expose, Type } from 'class-transformer';

import { DisciplineDto } from 'features/disciplines/dto';

export class RaceSeasonDto {
  @Expose()
  id: number;

  @Expose()
  seasonYear: number;

  @Expose()
  stages: number;

  @Expose()
  @Type(() => DisciplineDto)
  discipline: DisciplineDto;
}
