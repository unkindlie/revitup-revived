import {
  IsInt,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  MaxLength,
} from 'class-validator';

export class ArticleCreateDto {
  @IsString()
  @Length(25, 125)
  title: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  previewText?: string;

  @IsString()
  @IsOptional()
  @MaxLength(2000)
  text?: string;

  @IsUrl()
  @IsOptional()
  mainImgUrl?: string;

  @IsInt()
  @IsOptional()
  disciplineId?: number;
}
