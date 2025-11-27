import { IsEnum, IsNumber, IsPositive } from 'class-validator';

import { UserRole } from 'features/user/enums/user-role.enum';

export class AuthRoleChangeDto {
  @IsNumber()
  @IsPositive()
  userId: number;

  @IsEnum(UserRole, { each: true })
  role: UserRole[] = [UserRole.USER];
}
