import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Event } from 'features/events/event.entity';
import {
  EVENT_SELECT_MANY_OBJ,
  EVENT_SELECT_ONE_OBJ,
} from 'features/events/constants/event.constants';
import { EventCreateDto, EventUpdateDto } from 'features/events/dto';

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

  async createEvent(input: EventCreateDto, imgUrl?: string): Promise<void> {
    await this.repo.insert({ ...input, imgUrl });
  }

  async updateEvent(input: EventUpdateDto): Promise<void> {
    const { id, ...rest } = input;

    await this.repo.update(id, { ...rest });
  }

  async deleteEvent(id: number): Promise<boolean> {
    const exists = await this.repo.existsBy({ id });
    if (!exists) return false;

    await this.repo.delete(id);
    return true;
  }

  async exists(id: number): Promise<boolean> {
    return this.repo.existsBy({ id });
  }
}
