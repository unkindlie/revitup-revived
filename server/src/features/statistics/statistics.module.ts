import { Module } from '@nestjs/common';

import { RaceEventModule } from 'features/statistics/race-events/race-event.module';
import { RaceSeasonModule } from 'features/statistics/race-seasons/race-season.module';

@Module({
  imports: [RaceEventModule, RaceSeasonModule],
})
export class StatisticsModule {}
