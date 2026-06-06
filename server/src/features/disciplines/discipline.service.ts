import { Injectable, NotFoundException } from '@nestjs/common';

import { DisciplineEntity } from 'features/disciplines/discipline.entity';
import { DisciplineRepository } from 'features/disciplines/discipline.repository';

@Injectable()
export class DisciplineService {
  constructor(private repo: DisciplineRepository) {}

  async getDisciplines(): Promise<DisciplineEntity[]> {
    return this.repo.getDisciplines();
  }

  async getDisciplineByCode(code: string): Promise<DisciplineEntity> {
    const discipline = await this.repo.getDisciplineByCode(code);
    if (!discipline)
      throw new NotFoundException('Such discipline does not exist');

    return discipline;
  }
}
