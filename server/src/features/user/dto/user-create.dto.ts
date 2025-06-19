import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class UserCreateDto {
    @IsString()
    username: string;

    @IsStrongPassword(
        {
            minLength: 8,
            minUppercase: 0,
            minLowercase: 0,
            minNumbers: 0,
            minSymbols: 0,
        },
        {
            message: "Password doesn't meet the requirements",
        },
    )
    password: string;

    @IsEmail()
    emailAddress: string;
}
