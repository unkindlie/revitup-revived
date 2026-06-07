import { Injectable, NotFoundException } from '@nestjs/common';

import { plainToInstance } from 'class-transformer';

import { DriverRepository } from './driver.repository';

import { DriverDetailedDto, DriverQueryDto, DriverShortDto } from './dto';

@Injectable()
export class DriverService {
  constructor(private readonly repo: DriverRepository) {}

  async getDrivers(query: DriverQueryDto) {
    const [drivers, count] = await this.repo.findDrivers(
      query.page ?? 1,
      query.take ?? 12,
      query.discipline,
      query.search,
    );

    return {
      items: plainToInstance(DriverShortDto, drivers),
      totalCount: count,
      query: {
        ...query,
        totalPages: Math.ceil(count / (query.take ?? 12)),
      },
    };
  }

  async getDriverById(id: number) {
    const driver = await this.repo.findDriverById(id);

    if (!driver) {
      throw new NotFoundException('Driver not found');
    }

    return plainToInstance(DriverDetailedDto, driver);
  }

  async exists(id: number) {
    const exists = await this.repo.existsBy({ id });

    if (!exists) {
      throw new NotFoundException('Driver not found');
    }
  }

  async getFavDriverForUser(userId: number) {
    return this.repo.getFavDriverForUser(userId);
  }
}
