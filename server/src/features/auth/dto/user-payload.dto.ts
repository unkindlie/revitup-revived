import { Expose } from 'class-transformer';

import { UserRole } from 'features/user/enums/user-role.enum';

export class UserPayloadDto {
  @Expose()
  id: number;

  @Expose()
  username: string;

  @Expose()
  email: string;

  @Expose()
  role: UserRole;
}
