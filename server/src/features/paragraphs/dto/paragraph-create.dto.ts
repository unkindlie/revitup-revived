import { IsInt, IsString, Min } from 'class-validator';

export class ParagraphCreateDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsInt()
  @Min(0)
  order: number;

  @IsInt()
  articleId: number;
}
