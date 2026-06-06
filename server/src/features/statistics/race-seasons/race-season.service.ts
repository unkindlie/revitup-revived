import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { RaceSeasonRepository } from 'features/statistics/race-seasons/race-season.repository';
import { RaceEventService } from 'features/statistics/race-events/race-event.service';
import {
  RaceSeasonDto,
  RaceSeasonQueryDto,
} from 'features/statistics/race-seasons/dto';
import { RaceSeasonQuery } from 'features/statistics/race-seasons/types/race-season.query';

@Injectable()
export class RaceSeasonService {
  constructor(
    private raceEventService: RaceEventService,
    private repo: RaceSeasonRepository,
  ) {}

  async getRaceSeasonsByConditions(query: RaceSeasonQuery) {
    const queryDto: RaceSeasonQueryDto = {
      discipline: {
        shortCode: query.discipline,
      },
      seasonYear: query.year,
    };

    const [seasons, count] = await this.repo.getRaceSeasons(
      queryDto,
      query.page,
      query.take,
    );

    const items = plainToInstance(RaceSeasonDto, seasons);

    return {
      items,
      totalCount: count,
      query: {
        page: query.page ?? 1,
        take: query.take ?? 10,
        totalPages: Math.ceil(count / (query.take ?? 10)),
      },
    };
  }

  async getRaceSeasonById(id: number) {
    const season = await this.repo.getRaceSeasonById(id);
    if (!season)
      throw new NotFoundException('Such season is not found in the database');

    const raceEvents = await this.raceEventService.getRaceEventsBySeason(id);

    return { ...season, raceEvents };
  }
}
