import { Expose } from 'class-transformer';

export class ThreadCategoryShortDto {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  color: string;

  @Expose()
  icon: string;

  @Expose()
  code: string;
}
