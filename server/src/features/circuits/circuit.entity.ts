import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('circuits')
export class CircuitEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index('circuit_name_idx')
  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'text' })
  location: string;

  @Column()
  capacity: number;

  @Column({ type: 'numeric', scale: 3 })
  length: number;

  @Column({ name: 'other_names', type: 'text', array: true, default: [] })
  otherNames: string[];
}
