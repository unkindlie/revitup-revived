import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { PaginatedQuery } from 'common/types/pagination.type';

import { EventShortDto, EventDetailedDto } from 'features/events/dto';
import { EventRepository } from 'features/events/event.repository';

@Injectable()
export class EventService {
  constructor(private repo: EventRepository) {}

  async getEvents(query: PaginatedQuery): Promise<[EventShortDto[], number]> {
    const [events, count] = await this.repo.getEvents(query.page, query.take);

    return [plainToInstance(EventShortDto, events), count];
  }

  async getEventById(id: number): Promise<EventDetailedDto> {
    const event = await this.repo.getEventById(id);
    if (!event) throw new NotFoundException('Such event does not exist');

    return plainToInstance(EventDetailedDto, event);
  }
}
