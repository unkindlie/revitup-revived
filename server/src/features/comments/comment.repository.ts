import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Comment as CommentEntity } from 'features/comments/comment.entity';
import { CommentCreateDto, CommentGetQueryDto } from 'features/comments/dto';

@Injectable()
export class CommentRepository {
  constructor(
    @InjectRepository(CommentEntity) private repo: Repository<CommentEntity>,
  ) {}

  async getComments(): Promise<CommentEntity[]> {
    return this.repo
      .createQueryBuilder('c')

      .leftJoin('c.author', 'au')
      .addSelect(['au.id', 'au.username', 'au.roles', 'au.profileImgUrl'])

      .leftJoin('c.children', 'cc')
      .addSelect(['cc.id', 'cc.content'])

      .getMany();
  }

  async getCommentsForEntity(
    entityInfo: CommentGetQueryDto,
  ): Promise<[CommentEntity[], number]> {
    const { entitySource, entityId } = entityInfo;

    const [comments, totalCount] = await this.repo
      .createQueryBuilder('comment')

      .select([
        'comment.id',
        'comment.content',
        'comment.parentId',
        'comment.createdAt',
      ])

      .leftJoin('comment.author', 'au')
      .addSelect(['au.id', 'au.username', 'au.roles', 'au.profileImgUrl'])

      .leftJoin('comment.children', 'cc')
      .addSelect(['cc.id', 'cc.content'])

      .where('comment.entitySource = :source', { source: entitySource })
      .andWhere('comment.entityId = :id', { id: Number(entityId) })

      .getManyAndCount();

    return [comments, totalCount];
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

  async removeCommentsForEntity(entityInfo: CommentGetQueryDto) {
    await this.repo.delete(entityInfo);
  }
}
