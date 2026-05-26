import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RaceEntryEntity } from 'features/statistics/race-entries/race-entry.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RaceEntryEntity])],
})
export class RaceEntryModule {}
