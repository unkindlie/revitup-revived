import { IsStrongPassword } from 'class-validator';

import { STRONG_PASSWORD_REQS } from '../../auth/constants/auth.constants';

export class PasswordResetDto {
  @IsStrongPassword(STRONG_PASSWORD_REQS, {
    message: "Password doesn't meet the requirements",
  })
  password: string;
}

export type PasswordServiceResetDto = {
  id: string;
  userId: number;
  password: string;
};

export type PasswordAvailabilityCheckDto = Omit<
  PasswordServiceResetDto,
  'password'
>;
