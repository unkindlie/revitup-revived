import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('disciplines')
export class DisciplineEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  name: string;

  @Index('discipline_shortCode_idx')
  @Column({ name: 'short_code', length: 15 })
  shortCode: string;

  @Column({ name: 'logo_url', type: 'text' })
  logoUrl: string;
}
