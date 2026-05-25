import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { DisciplineEntity } from 'features/disciplines/discipline.entity';

@Entity('race_seasons')
@Index('unique_season_discipline', ['seasonYear', 'discipline'], {
  unique: true,
})
export class RaceSeasonEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'season_year', type: 'int' })
  seasonYear: number;

  @Column()
  stages: number;

  @ManyToOne(() => DisciplineEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'discipline_id' })
  discipline: DisciplineEntity;
}
