import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RaceClassificationEntity } from 'features/statistics/race-classifications/race-classification.entity';

@Injectable()
export class RaceClassificationRepository {
  constructor(
    @InjectRepository(RaceClassificationEntity)
    private repo: Repository<RaceClassificationEntity>,
  ) {}

  async getClassificationsForRaceEvent(
    raceEventId: number,
  ): Promise<RaceClassificationEntity[]> {
    return this.repo.find({
      where: { raceEvent: { id: raceEventId } },
      order: {
        finishPosition: 'ASC',
      },
      relations: ['raceEntry'],
    });
  }
}
