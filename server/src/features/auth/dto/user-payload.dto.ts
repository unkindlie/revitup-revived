import { Expose } from 'class-transformer';

export class UserPayloadDto {
  @Expose()
  id: number;

  @Expose()
  username: string;

  @Expose()
  email: string;
}
