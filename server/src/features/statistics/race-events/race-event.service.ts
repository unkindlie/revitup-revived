import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { RaceEventRepository } from 'features/statistics/race-events/race-event.repository';
import {
  RaceEventDetailedDto,
  RaceEventShortDto,
} from 'features/statistics/race-events/dto';

@Injectable()
export class RaceEventService {
  constructor(private repo: RaceEventRepository) {}

  async getRaceEventsBySeason(seasonId: number): Promise<RaceEventShortDto[]> {
    return plainToInstance(
      RaceEventShortDto,
      await this.repo.getRaceEventsBySeason(seasonId),
    );
  }

  async getRaceEventById(id: number): Promise<RaceEventDetailedDto> {
    const raceEvent = await this.repo.getRaceEventById(id);
    if (!raceEvent)
      throw new NotFoundException('Such race event does not exist');

    return plainToInstance(RaceEventDetailedDto, raceEvent);
  }
}
