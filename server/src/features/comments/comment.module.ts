import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Comment } from 'features/comments/comment.entity';
import { CommentController } from 'features/comments/comment.controller';
import { CommentRepository } from 'features/comments/comment.repository';
import { CommentService } from 'features/comments/comment.service';

@Module({
  imports: [TypeOrmModule.forFeature([Comment])],
  controllers: [CommentController],
  providers: [CommentService, CommentRepository],
})
export class CommentModule {}
