import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

import { CommentSource } from 'features/comments/types/comment-source.enum';

export class CommentCreateDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsEnum(CommentSource)
  entitySource: CommentSource;

  @IsInt()
  @IsPositive()
  entityId: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  parentId: number;
}
