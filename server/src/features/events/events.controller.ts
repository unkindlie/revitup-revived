import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';

import { PaginatedQuery } from 'common/types/pagination.type';

import { EventService } from 'features/events/event.service';

@Controller('events')
export class EventController {
  constructor(private service: EventService) {}

  @Get()
  async getEvents(@Query() routeQuery: PaginatedQuery) {
    const [events, totalCount] = await this.service.getEvents(routeQuery);

    return {
      items: events,
      totalCount,
      query: {
        ...routeQuery,
        totalPages: Math.ceil(totalCount / (routeQuery.take ?? 1)),
      },
    };
  }

  @Get(':id')
  async getEventById(@Param('id', ParseIntPipe) id: number) {
    return this.service.getEventById(id);
  }
}
