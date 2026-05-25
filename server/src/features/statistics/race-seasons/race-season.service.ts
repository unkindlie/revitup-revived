import { Injectable, NotFoundException } from '@nestjs/common';

import { RaceSeasonEntity } from 'features/statistics/race-seasons/race-season.entity';
import { RaceSeasonRepository } from 'features/statistics/race-seasons/race-season.repository';
import { RaceSeasonQuery } from 'features/statistics/race-seasons/types/race-season.query';
import { RaceSeasonQueryDto } from 'features/statistics/race-seasons/dto/race-season-query.dto';

@Injectable()
export class RaceSeasonService {
  constructor(private repo: RaceSeasonRepository) {}

  async getRaceSeasonsByConditions(
    query: RaceSeasonQuery,
  ): Promise<RaceSeasonEntity[]> {
    const queryDto: RaceSeasonQueryDto = {
      discipline: {
        shortCode: query.discipline,
      },
      seasonYear: query.year,
    };

    return this.repo.getRaceSeasons(queryDto);
  }

  async getRaceSeasonById(id: number): Promise<RaceSeasonEntity> {
    const season = await this.repo.getRaceSeasonById(id);
    if (!season)
      throw new NotFoundException('Such season is not found in the database');

    return season;
  }
}
