import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RaceSeasonEntity } from 'features/statistics/race-seasons/race-season.entity';
import { RACE_SEASON_MANY_SELECT } from 'features/statistics/race-seasons/constants/race-season.constants';
import { RaceSeasonQueryDto } from 'features/statistics/race-seasons/dto';

@Injectable()
export class RaceSeasonRepository {
  constructor(
    @InjectRepository(RaceSeasonEntity)
    private repo: Repository<RaceSeasonEntity>,
  ) {}

  async getRaceSeasons(
    conditions: RaceSeasonQueryDto,
    page: number = 1,
    take: number = 10,
  ): Promise<[RaceSeasonEntity[], number]> {
    return this.repo.findAndCount({
      select: RACE_SEASON_MANY_SELECT,
      where: conditions,
      relations: ['discipline'],
      order: {
        seasonYear: 'DESC',
      },
      take,
      skip: (page - 1) * take,
    });
  }

  async getRaceSeasonById(id: number): Promise<RaceSeasonEntity | null> {
    return this.repo.findOne({
      where: { id },
      relations: ['discipline'],
    });
  }
}
