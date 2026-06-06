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

  async getDisciplines(): Promise<DisciplineEntity[]> {
    return this.repo.find();
  }

  async getDisciplineByCode(code: string): Promise<DisciplineEntity | null> {
    return this.repo.findOne({
      where: {
        shortCode: code,
      },
    });
  }
}
