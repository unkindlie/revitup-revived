import { IsNotEmpty, IsString, Length, MaxLength } from 'class-validator';

export class ThreadCreateDto {
  @IsString()
  @Length(10, 75)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(5000)
  description: string;
}
