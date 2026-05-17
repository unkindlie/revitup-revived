import { IsEnum, IsNumberString } from 'class-validator';

import { CommentSource } from 'features/comments/types/comment-source.enum';

export class CommentGetQueryDto {
  @IsEnum(CommentSource)
  entitySource: CommentSource;

  @IsNumberString()
  entityId: string;
}
