import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';

import { RaceSeasonService } from 'features/statistics/race-seasons/race-season.service';
import { RaceSeasonQuery } from 'features/statistics/race-seasons/types/race-season.query';

@Controller('race-seasons')
export class RaceSeasonController {
  constructor(private service: RaceSeasonService) {}

  @Get()
  async getRaceSeasonsByConditions(@Query() query: RaceSeasonQuery) {
    return this.service.getRaceSeasonsByConditions(query);
  }

  @Get(':id')
  async getRaceSeasonById(@Param('id', ParseIntPipe) id: number) {
    return this.service.getRaceSeasonById(id);
  }
}
