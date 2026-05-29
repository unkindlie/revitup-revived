import { Expose } from 'class-transformer';

export class DisciplineDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  shortCode: string;

  @Expose()
  logoUrl: string;
}
