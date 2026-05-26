import { Injectable } from '@nestjs/common';

import { RaceClassificationRepository } from 'features/statistics/race-classifications/race-classification.repository';

@Injectable()
export class RaceClassificationService {
  constructor(private repo: RaceClassificationRepository) {}

  async getClassificationsForRaceEvent(raceEventId: number) {
    return this.repo.getClassificationsForRaceEvent(raceEventId);
  }
}
