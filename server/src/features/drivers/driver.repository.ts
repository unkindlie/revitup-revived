import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';

import { DriverEntity } from './driver.entity';

@Injectable()
export class DriverRepository {
  constructor(
    @InjectRepository(DriverEntity)
    private readonly repo: Repository<DriverEntity>,
  ) {}

  async findDrivers(
    page = 1,
    take = 12,
    disciplineId?: number,
  ): Promise<[DriverEntity[], number]> {
    const qb = this.repo
      .createQueryBuilder('driver')
      .leftJoinAndSelect('driver.disciplines', 'discipline')
      .orderBy('driver.lastName', 'ASC')
      .addOrderBy('driver.firstName', 'ASC')
      .skip((page - 1) * take)
      .take(take);

    if (disciplineId) {
      qb.andWhere('discipline.id = :disciplineId', {
        disciplineId,
      });
    }

    return qb.getManyAndCount();
  }

  async findDriverById(id: number): Promise<DriverEntity | null> {
    return this.repo.findOne({
      where: {
        id,
      },
      relations: {
        disciplines: true,
        images: true,
      },
    });
  }

  async searchDrivers(
    query: string,
    page = 1,
    take = 12,
  ): Promise<[DriverEntity[], number]> {
    return this.repo.findAndCount({
      where: [
        {
          firstName: ILike(`%${query}%`),
        },
        {
          lastName: ILike(`%${query}%`),
        },
      ],
      relations: {
        disciplines: true,
      },
      order: {
        lastName: 'ASC',
      },
      skip: (page - 1) * take,
      take,
    });
  }

  async existsBy(where: FindOptionsWhere<DriverEntity>): Promise<boolean> {
    return this.repo.existsBy(where);
  }
}
