import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { RaceEventRepository } from 'features/statistics/race-events/race-event.repository';
import {
  RaceEventDetailedDto,
  RaceEventShortDto,
} from 'features/statistics/race-events/dto';
import { RaceClassificationService } from 'features/statistics/race-classifications/race-classification.service';

@Injectable()
export class RaceEventService {
  constructor(
    private raceClassificationService: RaceClassificationService,
    private repo: RaceEventRepository,
  ) {}

  async getRaceEventsBySeason(seasonId: number): Promise<RaceEventShortDto[]> {
    return plainToInstance(
      RaceEventShortDto,
      await this.repo.getRaceEventsBySeason(seasonId),
    );
  }

  async getRaceEventById(id: number) {
    const raceEvent = await this.repo.getRaceEventById(id);
    if (!raceEvent)
      throw new NotFoundException('Such race event does not exist');

    const converted = plainToInstance(RaceEventDetailedDto, raceEvent);

    return {
      ...converted,
      classification:
        await this.raceClassificationService.getClassificationsForRaceEvent(id),
    };
  }
}
