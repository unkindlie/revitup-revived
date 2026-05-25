import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RaceEventEntity } from 'features/statistics/race-events/race-event.entity';

import {
  RACE_EVENT_MANY_SELECT_BY_SEASON,
  RACE_EVENT_ONE_SELECT,
} from 'features/statistics/race-events/constants/race-events.constants';

@Injectable()
export class RaceEventRepository {
  constructor(
    @InjectRepository(RaceEventEntity)
    private repo: Repository<RaceEventEntity>,
  ) {}

  async getRaceEventsBySeason(seasonId: number): Promise<RaceEventEntity[]> {
    return this.repo.find({
      select: RACE_EVENT_MANY_SELECT_BY_SEASON,
      where: { season: { id: seasonId } },
      relations: ['circuit'],
      order: {
        eventStage: 'ASC',
      },
    });
  }

  async getRaceEventById(id: number): Promise<RaceEventEntity | null> {
    return this.repo.findOne({
      select: RACE_EVENT_ONE_SELECT,
      where: { id },
      relations: ['circuit', 'season', 'season.discipline'],
    });
  }
}
