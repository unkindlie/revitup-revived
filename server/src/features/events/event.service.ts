import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { PaginatedQuery } from 'common/types/pagination.type';

import {
  EventShortDto,
  EventDetailedDto,
  EventCreateDto,
} from 'features/events/dto';
import { EventRepository } from 'features/events/event.repository';
import { ImageService } from '../images/image.service';

@Injectable()
export class EventService {
  constructor(
    private imageService: ImageService,
    private repo: EventRepository,
  ) {}

  async getEvents(query: PaginatedQuery): Promise<[EventShortDto[], number]> {
    const [events, count] = await this.repo.getEvents(query.page, query.take);

    return [plainToInstance(EventShortDto, events), count];
  }

  async getEventById(id: number): Promise<EventDetailedDto> {
    const event = await this.repo.getEventById(id);
    if (!event) throw new NotFoundException('Such event does not exist');

    return plainToInstance(EventDetailedDto, event);
  }

  async createEvent(input: EventCreateDto, mainImage?: Express.Multer.File) {
    let imageLink: string | undefined = undefined;
    if (mainImage) {
      const { url } = await this.imageService.uploadImage(
        mainImage,
        `images/events`,
      );
      imageLink = url;
    }

    await this.repo.createEvent(input, imageLink);
  }
}
