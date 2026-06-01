import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DisciplineEntity } from 'features/disciplines/discipline.entity';

@Injectable()
export class DisciplineRepository {
  constructor(
    @InjectRepository(DisciplineEntity)
    private repo: Repository<DisciplineEntity>,
  ) {}

  async getDisciplines(
    page: number = 1,
    take: number = 10,
  ): Promise<[DisciplineEntity[], number]> {
    return this.repo.findAndCount({
      order: {
        title: 'ASC',
      },
      take,
      skip: (page - 1) * 10,
    });
  }

  async getDisciplineByCode(code: string): Promise<DisciplineEntity | null> {
    return this.repo.findOne({
      where: {
        shortCode: code,
      },
    });
  }
}
