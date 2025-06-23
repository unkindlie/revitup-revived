import { IsNumber, IsOptional, MaxLength, MinLength } from 'class-validator';

export class UserUpdateDto {
    @IsNumber()
    id: number;

    @IsOptional()
    @MinLength(8)
    @MaxLength(100)
    username: string;
}
