import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';

import { DriverService } from './driver.service';
import { DriverQueryDto } from './dto';

@Controller('drivers')
export class DriverController {
  constructor(private readonly service: DriverService) {}

  @Get()
  async getDrivers(@Query() query: DriverQueryDto) {
    return this.service.getDrivers(query);
  }

  @Get(':id')
  async getDriverById(@Param('id', ParseIntPipe) id: number) {
    return this.service.getDriverById(id);
  }
}
