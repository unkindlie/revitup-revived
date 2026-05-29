import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { RaceEarlyEndReason } from 'features/statistics/race-classifications/types/race-early-end-reason.enum';
import { RaceEntryEntity } from 'features/statistics/race-entries/race-entry.entity';
import { RaceEventEntity } from 'features/statistics/race-events/race-event.entity';

@Entity('race_classifications')
@Index(
  'unique_position_entry_event_idx',
  ['finishPosition', 'raceEntry', 'raceEvent'],
  { unique: true },
)
export class RaceClassificationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer' })
  timeMs: number;

  @Column({ name: 'finish_position', nullable: true })
  finishPosition: number;

  @Column({ name: 'is_fastest_lap', nullable: false })
  isFastestLap: boolean;

  @Column({
    name: 'early_end_reason',
    type: 'enum',
    enum: RaceEarlyEndReason,
    nullable: true,
  })
  earlyEndReason: RaceEarlyEndReason;

  @ManyToOne(() => RaceEntryEntity, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'race_entry_id' })
  raceEntry: RaceEntryEntity;

  @ManyToOne(() => RaceEventEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'race_event_id' })
  raceEvent: RaceEventEntity;
}
