import { Module } from '@nestjs/common';

import { RaceSeasonModule } from 'features/statistics/race-seasons/race-season.module';

@Module({
  imports: [RaceSeasonModule],
})
export class StatisticsModule {}
