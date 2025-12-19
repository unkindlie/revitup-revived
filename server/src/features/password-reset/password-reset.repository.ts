import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  PASSWORD_RESET_NOT_COMPLETE_MAX_AMOUNT,
  PasswordResetInaccessibilityExplanation,
} from './constants/password-reset.constants';
import { RequestSource } from './enums/request-source.enum';
import { PasswordResetRequestEntity } from './password-reset-request.entity';
import { RequestInaccessibilityReason } from './enums/request-not-available-reason.enum';
import { PasswordAvailabilityCheckDto } from './dto/password-reset.dto';

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

  async checkIfRequestAvailableForUsage(input: PasswordAvailabilityCheckDto) {
    let reason: RequestInaccessibilityReason | null = null;

    const resetEntity = await this.repo.findOne({
      select: {
        id: true,
        completedAt: true,
        user: { id: true },
      },
      where: { id: input.id },
      relations: {
        user: true,
      },
    });

    if (resetEntity === null)
      reason = RequestInaccessibilityReason.DOESNT_EXIST;

    if (resetEntity && resetEntity.completedAt !== null)
      reason = RequestInaccessibilityReason.ALREADY_USED;

    if (resetEntity && resetEntity.user.id !== input.userId)
      reason = RequestInaccessibilityReason.DOESNT_BELONG_TO_USER;

    return {
      code: reason,
      message: reason ? PasswordResetInaccessibilityExplanation[reason] : null,
      available: reason === null,
    };
  }

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
