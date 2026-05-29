import { Expose, Type } from 'class-transformer';

export class CircuitShortDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  location: string;

  @Expose()
  @Type(() => Number)
  length: number;
}
