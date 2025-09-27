import { IsEmail, IsStrongPassword } from 'class-validator';

import { STRONG_PASSWORD_REQS } from 'features/auth/constants/auth.constants';

export class AuthLoginDto {
  @IsEmail()
  email: string;

  @IsStrongPassword(STRONG_PASSWORD_REQS, {
    message: "Password doesn't meet the requirements",
  })
  password: string;
}
