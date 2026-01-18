import {
  IsOptional,
  IsString,
  IsUrl,
  Length,
  MaxLength,
} from 'class-validator';

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

  @IsUrl()
  @IsOptional()
  imageUrl?: string;
}
