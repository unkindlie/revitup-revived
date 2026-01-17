import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// TODO: add soft delete
@Entity('articles')
export class Article {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @Column({ name: 'image_url' })
  imageUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
