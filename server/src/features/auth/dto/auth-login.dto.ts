import { IsEmail, IsStrongPassword } from 'class-validator';

import { strongPasswordReqs } from '../constants/auth.constants';

export class AuthLoginDto {
    @IsEmail()
    emailAddress: string;

    @IsStrongPassword(strongPasswordReqs, {
        message: "Password doesn't meet the requirements",
    })
    password: string;
}
