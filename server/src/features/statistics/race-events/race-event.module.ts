import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RaceEventController } from 'features/statistics/race-events/race-event.controller';
import { RaceEventEntity } from 'features/statistics/race-events/race-event.entity';
import { RaceEventRepository } from 'features/statistics/race-events/race-event.repository';
import { RaceEventService } from 'features/statistics/race-events/race-event.service';

@Module({
  imports: [TypeOrmModule.forFeature([RaceEventEntity])],
  controllers: [RaceEventController],
  providers: [RaceEventService, RaceEventRepository],
  exports: [RaceEventService],
})
export class RaceEventModule {}
