import { Expose, Type } from 'class-transformer';

export class RaceEventShortDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  laps: string;

  @Expose()
  eventStage: string;

  @Expose()
  startDate: Date;

  @Expose()
  endDate: Date;

  @Expose()
  @Type(() => CircuitShorterDto)
  circuit: CircuitShorterDto;
}

class CircuitShorterDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  location: string;
}
