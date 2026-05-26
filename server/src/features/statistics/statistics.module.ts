import { Module } from '@nestjs/common';

import { RaceEntryModule } from 'features/statistics/race-entries/race-entry.module';
import { RaceEventModule } from 'features/statistics/race-events/race-event.module';
import { RaceSeasonModule } from 'features/statistics/race-seasons/race-season.module';

@Module({
  imports: [RaceEntryModule, RaceEventModule, RaceSeasonModule],
})
export class StatisticsModule {}
