import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CommentSource } from 'features/comments/types/comment-source.enum';
import { UserEntity } from 'features/user/user.entity';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  content: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'author_id' })
  author: UserEntity;

  @Index('comment-parent_id-idx')
  @ManyToOne(() => Comment, (comment) => comment.children, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'parent_id' })
  parent: Comment | null;

  @Column({ name: 'parent_id', nullable: true })
  parentId: number | null;

  @OneToMany(() => Comment, (comment) => comment.parent, {})
  children: Comment[];

  @Column({
    type: 'enum',
    enum: CommentSource,
    name: 'entity_source',
  })
  entitySource: CommentSource;

  @Column({
    name: 'entity_id',
  })
  entityId: number;
}
