import { Injectable } from '@nestjs/common';

import { Comment as CommentEntity } from 'features/comments/comment.entity';
import { CommentRepository } from 'features/comments/comment.repository';
import { CommentCreateDto } from 'features/comments/dto/comment-create.dto';

type CommentNode = CommentEntity & {
  children: CommentNode[];
};

@Injectable()
export class CommentService {
  constructor(private repo: CommentRepository) {}

  async getComments(): Promise<CommentNode[]> {
    const comments = await this.repo.getComments();

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

  async createComment(
    input: CommentCreateDto,
    authorId: number,
  ): Promise<void> {
    await this.repo.createComment(input, authorId);
  }
}
