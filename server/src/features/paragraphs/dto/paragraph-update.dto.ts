import { IsOptional, IsString, IsInt, Min } from 'class-validator';

export class ParagraphUpdateDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  order?: number;
}
