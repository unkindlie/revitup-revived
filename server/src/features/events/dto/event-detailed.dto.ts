import { Expose } from 'class-transformer';

export class EventDetailedDto {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  description: string;

  @Expose()
  mainImgUrl: string;

  @Expose()
  location: string;

  @Expose()
  startDate: Date;

  @Expose()
  endDate: Date;
}
