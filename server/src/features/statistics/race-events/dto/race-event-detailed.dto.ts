import { Expose, Type } from 'class-transformer';

import { CircuitShortDto } from 'features/circuits/dto';
import { RaceSeasonDto } from 'features/statistics/race-seasons/dto';

export class RaceEventDetailedDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  laps: string;

  @Expose()
  eventStage: string;

  @Expose()
  startDate: Date;

  @Expose()
  endDate: Date;

  @Expose()
  @Type(() => CircuitShortDto)
  circuit: CircuitShortDto;

  @Expose()
  @Type(() => RaceSeasonDto)
  season: RaceSeasonDto;
}
