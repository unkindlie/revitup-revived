import { IsEnum, IsNumber, IsPositive } from 'class-validator';

import { UserRole } from '../../user/enums/user-role.enum';

export class AuthRoleChangeDto {
  @IsNumber()
  @IsPositive()
  userId: number;

  @IsEnum(UserRole)
  role: UserRole;
}
