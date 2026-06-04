import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ArticleStatus } from 'features/articles/enums/article-status.enum';
import { ParagraphEntity } from 'features/paragraphs/paragraph.entity';

@Entity('articles')
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 125,
  })
  title: string;

  @Column({
    length: 200,
    name: 'preview_text',
    nullable: true,
  })
  previewText: string;

  // TODO: replace this column with a separate "paragraphs" table
  @Column({ length: 2000, nullable: true })
  text: string;

  @Column({ name: 'main_img_url' })
  mainImgUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({ nullable: true })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt: Date | null;

  @OneToMany(() => ParagraphEntity, (p) => p.article)
  paragraphs: ParagraphEntity;

  @Column({
    type: 'enum',
    enum: ArticleStatus,
    default: ArticleStatus.DRAFT,
  })
  status: ArticleStatus;
}
