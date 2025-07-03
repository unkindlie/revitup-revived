import {
    IsEmail,
    IsString,
    IsStrongPassword,
    MaxLength,
    MinLength,
} from 'class-validator';

import { STRONG_PASSWORD_REQS } from '../../auth/constants/auth.constants';

export class UserCreateDto {
    @IsString()
    @MinLength(8)
    @MaxLength(100)
    username: string;

    @IsStrongPassword(STRONG_PASSWORD_REQS, {
        message: "Password doesn't meet the requirements",
    })
    password: string;

    @IsEmail()
    emailAddress: string;
}
