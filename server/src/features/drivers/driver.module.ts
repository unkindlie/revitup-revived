import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DriverEntity } from './driver.entity';
import { DriverImageEntity } from './driver-image.entity';
import { DriverController } from './driver.controller';
import { DriverService } from './driver.service';
import { DriverRepository } from './driver.repository';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DriverEntity, DriverImageEntity]),
    UserModule,
  ],
  controllers: [DriverController],
  providers: [DriverService, DriverRepository],
  exports: [DriverService, DriverRepository],
})
export class DriverModule {}
