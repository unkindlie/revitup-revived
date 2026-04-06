import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('thread_categories')
export class ThreadCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'thread_category_name', length: 50 })
  name: string;

  @Column({ name: 'thread_category_description', length: 250 })
  description: string;

  @Column({ name: 'thread_category_color', length: 10 })
  color: string;

  @Column({ name: 'thread_category_icon', length: 25 })
  icon: string;
}
