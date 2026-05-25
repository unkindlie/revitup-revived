import { Injectable, NotFoundException } from '@nestjs/common';

import { PaginatedQuery } from 'common/types/pagination.type';

import { DisciplineEntity } from 'features/disciplines/discipline.entity';
import { DisciplineRepository } from 'features/disciplines/discipline.repository';

@Injectable()
export class DisciplineService {
  constructor(private repo: DisciplineRepository) {}

  async getDisciplines(
    pagination: PaginatedQuery,
  ): Promise<[DisciplineEntity[], number]> {
    return this.repo.getDisciplines(pagination.page, pagination.take);
  }

  async getDisciplineByCode(code: string): Promise<DisciplineEntity> {
    const discipline = await this.repo.getDisciplineByCode(code);
    if (!discipline)
      throw new NotFoundException('Such discipline does not exist');

    return discipline;
  }
}
