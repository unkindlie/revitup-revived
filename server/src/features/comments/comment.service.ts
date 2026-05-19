import { Injectable } from '@nestjs/common';

import { Comment as CommentEntity } from 'features/comments/comment.entity';
import { CommentRepository } from 'features/comments/comment.repository';
import { CommentCreateDto, CommentGetQueryDto } from 'features/comments/dto';

type CommentNode = CommentEntity & {
  children: CommentNode[];
};

@Injectable()
export class CommentService {
  constructor(private repo: CommentRepository) {}

  async getComments(): Promise<CommentNode[]> {
    const comments = await this.repo.getComments();

    return this.getCommentRoots(comments);
  }

  async getCommentsForEntity(
    entityInfo: CommentGetQueryDto,
  ): Promise<[CommentNode[], number]> {
    const [comments, totalCount] =
      await this.repo.getCommentsForEntity(entityInfo);
    const roots = this.getCommentRoots(comments);

    return [roots, totalCount];
  }

  async createComment(
    input: CommentCreateDto,
    authorId: number,
  ): Promise<void> {
    await this.repo.createComment(input, authorId);
  }

  private getCommentRoots(comments: CommentEntity[]): CommentNode[] {
    const map = new Map<number, CommentNode>();
    const roots: CommentNode[] = [];

    for (const comment of comments) {
      map.set(comment.id, {
        ...comment,
        children: [],
      });
    }

    for (const comment of comments) {
      const node = map.get(comment.id)!;

      if (comment.parentId) {
        map.get(comment.parentId)?.children.push(node);
      } else {
        roots.push(node);
      }
    }

    return roots;
  }
}
