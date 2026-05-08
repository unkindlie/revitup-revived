import { Expose } from 'class-transformer';

export class EventShortDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  imgUrl: string;

  @Expose()
  startDate: Date;

  @Expose()
  endDate: Date;
}
