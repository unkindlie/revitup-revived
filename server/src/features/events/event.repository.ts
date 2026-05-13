import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Event } from 'features/events/event.entity';
import {
  EVENT_SELECT_MANY_OBJ,
  EVENT_SELECT_ONE_OBJ,
} from 'features/events/constants/event.constants';
import { EventCreateDto } from './dto';

@Injectable()
export class EventRepository {
  constructor(@InjectRepository(Event) private repo: Repository<Event>) {}

  async getEvents(
    page: number = 1,
    take: number = 10,
  ): Promise<[Event[], number]> {
    return this.repo.findAndCount({
      select: EVENT_SELECT_MANY_OBJ,
      order: {
        startDate: 'ASC',
      },
      take,
      skip: (page - 1) * take,
    });
  }

  async getEventById(id: number): Promise<Event | null> {
    return this.repo.findOne({
      select: EVENT_SELECT_ONE_OBJ,
      where: { id },
    });
  }

  async createEvent(input: EventCreateDto, imgUrl?: string) {
    await this.repo.insert({ ...input, imgUrl });
  }
}
