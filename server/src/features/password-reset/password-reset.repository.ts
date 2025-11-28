import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PASSWORD_RESET_NOT_COMPLETE_MAX_AMOUNT } from './constants/password-reset.constants';
import { RequestSource } from './enums/request-source.enum';
import { PasswordResetRequestEntity } from './password-reset-request.entity';

@Injectable()
export class PasswordResetRepository {
  constructor(
    @InjectRepository(PasswordResetRequestEntity)
    private repo: Repository<PasswordResetRequestEntity>,
  ) {}

  async createResetRequest(
    userId: number,
    source: RequestSource,
  ): Promise<void> {
    const entity = this.repo.create({ source, user: { id: userId } });

    await this.repo.insert(entity);
  }

  async markRequestAsSuccess(id: string): Promise<void> {
    await this.repo.update(id, {
      completedAt: new Date(),
    });
  }

  async checkIfRequestAvailableForUsage(id: string) {}

  async checkIfPossibleToCreateNewRequest(userId: number): Promise<boolean> {
    const count = await this.repo.count({
      where: {
        completedAt: undefined,
        user: { id: userId },
        source: RequestSource.BY_EMAIL,
      },
    });

    return count < PASSWORD_RESET_NOT_COMPLETE_MAX_AMOUNT;
  }
}
