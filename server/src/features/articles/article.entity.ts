import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ArticleStatus } from 'features/articles/enums/article-status.enum';
import { ParagraphEntity } from 'features/paragraphs/paragraph.entity';
import { UserEntity } from '../user/user.entity';
import { DisciplineEntity } from '../disciplines/discipline.entity';

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

  @Column({ name: 'main_img_url', nullable: true })
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

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'author_id' })
  author: UserEntity;

  @ManyToOne(() => DisciplineEntity, { nullable: true })
  @JoinColumn({ name: 'discipline_id' })
  discipline: DisciplineEntity;
}
