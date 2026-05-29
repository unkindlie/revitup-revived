import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

import { RaceEventService } from 'features/statistics/race-events/race-event.service';

@Controller('race-events')
export class RaceEventController {
  constructor(private service: RaceEventService) {}

  @Get(':id')
  async getRaceEventById(@Param('id', ParseIntPipe) id: number) {
    return this.service.getRaceEventById(id);
  }

  @Get('by-season/:id')
  async getRaceEventsBySeason(@Param('id', ParseIntPipe) id: number) {
    return this.service.getRaceEventsBySeason(id);
  }
}
