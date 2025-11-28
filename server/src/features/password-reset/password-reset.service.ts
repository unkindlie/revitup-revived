import { ForbiddenException, Injectable } from '@nestjs/common';

import { RequestSource } from './enums/request-source.enum';
import { PasswordResetRepository } from './password-reset.repository';

@Injectable()
export class PasswordResetService {
  constructor(private repo: PasswordResetRepository) {}

  async createPasswordResetRequest(
    userId: number,
    source: RequestSource,
  ): Promise<void> {
    const would = await this.repo.checkIfPossibleToCreateNewRequest(userId);
    if (!would)
      throw new ForbiddenException(
        'You have used your request limit; please try later',
      );

    await this.repo.createResetRequest(userId, source);
  }

  async changePassword() {}
}
