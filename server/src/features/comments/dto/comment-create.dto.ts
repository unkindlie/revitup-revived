import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CommentCreateDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsInt()
  @IsOptional()
  parentId: number;
}
