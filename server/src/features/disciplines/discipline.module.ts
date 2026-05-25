import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DisciplineController } from 'features/disciplines/discipline.controller';
import { DisciplineEntity } from 'features/disciplines/discipline.entity';
import { DisciplineRepository } from 'features/disciplines/discipline.repository';
import { DisciplineService } from 'features/disciplines/discipline.service';

@Module({
  imports: [TypeOrmModule.forFeature([DisciplineEntity])],
  controllers: [DisciplineController],
  providers: [DisciplineService, DisciplineRepository],
})
export class DisciplineModule {}
