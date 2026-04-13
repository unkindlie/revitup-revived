import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('thread_categories')
export class ThreadCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 250 })
  description: string;

  @Column({ length: 10 })
  color: string;

  @Column({ length: 25 })
  icon: string;

  @Column({ name: 'short_code', length: 25 })
  shortCode: string;
}
