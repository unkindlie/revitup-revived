import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('disciplines')
export class DisciplineEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  title: string;

  @Index('discipline_shortCode_idx')
  @Column({ name: 'short_code', length: 15 })
  shortCode: string;

  @Column({ name: 'main_img_url', type: 'text' })
  mainImgUrl: string;
}
