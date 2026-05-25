import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RaceSeasonEntity } from 'features/statistics/race-seasons/race-season.entity';
import { RACE_SEASON_MANY_SELECT } from 'features/statistics/race-seasons/constants/race-season.constants';
import { RaceSeasonQueryDto } from 'features/statistics/race-seasons/dto/race-season-query.dto';

@Injectable()
export class RaceSeasonRepository {
  constructor(
    @InjectRepository(RaceSeasonEntity)
    private repo: Repository<RaceSeasonEntity>,
  ) {}

  async getRaceSeasons(
    conditions: RaceSeasonQueryDto,
  ): Promise<RaceSeasonEntity[]> {
    return this.repo.find({
      select: RACE_SEASON_MANY_SELECT,
      where: conditions,
      relations: ['discipline'],
      order: {
        seasonYear: 'DESC',
      },
    });
  }

  async getRaceSeasonById(id: number): Promise<RaceSeasonEntity | null> {
    return this.repo.findOne({
      where: { id },
      relations: ['discipline'],
    });
  }
}
