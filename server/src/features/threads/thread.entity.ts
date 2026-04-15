import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CREATED_AT_COLUMN_NAME } from 'common/constants/database.constants';
import { UserEntity } from 'features/user/user.entity';
import { ThreadCategory } from 'features/thread-categories/thread-category.entity';

@Entity('threads')
export class Thread {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
  })
  title: string;

  @Column({
    type: 'text',
  })
  description: string;

  @CreateDateColumn({ name: CREATED_AT_COLUMN_NAME })
  createdAt: Date;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'author_id' })
  author: UserEntity;

  @ManyToOne(() => ThreadCategory)
  @JoinColumn({ name: 'category_id' })
  category: ThreadCategory;
}
