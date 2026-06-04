import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  JoinColumn,
} from 'typeorm';

import {
  CREATED_AT_COLUMN_NAME,
  UPDATED_AT_COLUMN_NAME,
} from 'common/constants/database.constants';

import { Article } from 'features/articles/article.entity';

@Entity('paragraphs')
export class ParagraphEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'int' })
  order: number;

  @ManyToOne(() => Article, (a) => a.paragraphs, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'article_id' })
  @Index('paragraphs_article_idx')
  article: Article;

  @CreateDateColumn({ name: CREATED_AT_COLUMN_NAME })
  createdAt: Date;

  @UpdateDateColumn({ name: UPDATED_AT_COLUMN_NAME })
  updatedAt: Date;
}
