import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RaceEventModule } from 'features/statistics/race-events/race-event.module';
import { RaceSeasonController } from 'features/statistics/race-seasons/race-season.controller';
import { RaceSeasonEntity } from 'features/statistics/race-seasons/race-season.entity';
import { RaceSeasonRepository } from 'features/statistics/race-seasons/race-season.repository';
import { RaceSeasonService } from 'features/statistics/race-seasons/race-season.service';

@Module({
  imports: [TypeOrmModule.forFeature([RaceSeasonEntity]), RaceEventModule],
  controllers: [RaceSeasonController],
  providers: [RaceSeasonService, RaceSeasonRepository],
})
export class RaceSeasonModule {}
