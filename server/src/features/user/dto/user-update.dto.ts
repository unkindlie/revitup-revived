import {
  IsEnum,
  IsNumber,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';

import { UserRole } from '../enums/user-role.enum';

export class UserUpdateDto {
  @IsNumber()
  id: number;

  @IsOptional()
  @MinLength(8)
  @MaxLength(100)
  username?: string;

  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;
}
