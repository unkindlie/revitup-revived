import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Comment as CommentEntity } from 'features/comments/comment.entity';
import { CommentCreateDto } from 'features/comments/dto/comment-create.dto';

@Injectable()
export class CommentRepository {
  constructor(
    @InjectRepository(CommentEntity) private repo: Repository<CommentEntity>,
  ) {}

  async getComments(): Promise<CommentEntity[]> {
    return this.repo
      .createQueryBuilder('comment')

      .leftJoin('comment.author', 'author')
      .addSelect(['author.id', 'author.username', 'author.roles'])

      .leftJoin('comment.children', 'child')
      .addSelect(['child.id', 'child.content'])

      .getMany();
  }

  async createComment(
    input: CommentCreateDto,
    authorId: number,
  ): Promise<void> {
    const { parentId, ...rest } = input;

    await this.repo.insert({
      ...rest,
      parent: { id: parentId },
      author: { id: authorId },
    });
  }
}
