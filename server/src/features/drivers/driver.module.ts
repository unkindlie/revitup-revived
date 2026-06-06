import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DriverEntity } from './driver.entity';
import { DriverImageEntity } from './driver-image.entity';
import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';
import { DriverRepository } from './driver.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DriverEntity, DriverImageEntity])],
  controllers: [DriverController],
  providers: [DriverService, DriverRepository],
  exports: [DriverService, DriverRepository],
})
export class DriverModule {}
