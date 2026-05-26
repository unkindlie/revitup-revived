import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { DisciplineEntity } from 'features/disciplines/discipline.entity';
import { RaceSeasonEntity } from 'features/statistics/race-seasons/race-season.entity';

@Entity('race_entries')
@Index('unique_entryNumber_season_idx', ['entryNumber', 'season'], {
  unique: true,
})
export class RaceEntryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ name: 'entry_number' })
  entryNumber: number;

  @Column({ type: 'text' })
  car: string;

  @ManyToOne(() => RaceSeasonEntity)
  @JoinColumn({ name: 'season_id' })
  season: RaceSeasonEntity;

  @ManyToOne(() => DisciplineEntity)
  @JoinColumn({ name: 'discipline_id' })
  discipline: DisciplineEntity;
}
