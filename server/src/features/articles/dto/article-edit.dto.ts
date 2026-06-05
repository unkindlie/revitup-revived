import { Type } from 'class-transformer';
import {
  IsArray,
  IsInt,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  ValidateNested,
} from 'class-validator';

class ParagraphDto {
  @IsString()
  @Length(1, 200)
  title: string;

  @IsString()
  @MaxLength(5000)
  content: string;

  @IsInt()
  order: number;
}

export class ArticleEditDto {
  @IsString()
  @IsOptional()
  @Length(25, 125)
  title?: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  previewText?: string;

  @IsString()
  @IsOptional()
  @MaxLength(2000)
  text?: string;

  @IsInt()
  @IsOptional()
  disciplineId?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ParagraphDto)
  paragraphs?: ParagraphDto[];
}
