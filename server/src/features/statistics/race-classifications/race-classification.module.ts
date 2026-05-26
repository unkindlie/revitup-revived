import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RaceClassificationEntity } from 'features/statistics/race-classifications/race-classification.entity';
import { RaceClassificationRepository } from 'features/statistics/race-classifications/race-classification.repository';
import { RaceClassificationService } from 'features/statistics/race-classifications/race-classification.service';

@Module({
  imports: [TypeOrmModule.forFeature([RaceClassificationEntity])],
  providers: [RaceClassificationService, RaceClassificationRepository],
  exports: [RaceClassificationService],
})
export class RaceClassificationModule {}
