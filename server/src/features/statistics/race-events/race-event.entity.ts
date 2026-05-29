import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CircuitEntity } from 'features/circuits/circuit.entity';
import { RaceSeasonEntity } from 'features/statistics/race-seasons/race-season.entity';

@Entity('race_events')
export class RaceEventEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column()
  laps: number;

  @Column({ name: 'event_stage' })
  eventStage: number;

  @Column({
    name: 'start_date',
    type: 'timestamptz',
    precision: 0,
    default: () => 'CURRENT_TIMESTAMP',
  })
  startDate: Date;

  @Column({
    name: 'end_date',
    type: 'timestamptz',
    precision: 0,
    default: () => 'CURRENT_TIMESTAMP',
  })
  endDate: Date;

  @ManyToOne(() => CircuitEntity, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'circuit_id' })
  circuit: CircuitEntity;

  @ManyToOne(() => RaceSeasonEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'season_id' })
  season: RaceSeasonEntity;
}
