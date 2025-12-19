import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { RequestSource } from './enums/request-source.enum';
import { PasswordResetRepository } from './password-reset.repository';
import { PasswordServiceResetDto } from './dto/password-reset.dto';
import { RequestInaccessibilityReason } from './enums/request-not-available-reason.enum';
import { UserService } from '../user/user.service';
import { PasswordHelper } from '../auth/helpers/password.helper';

@Injectable()
export class PasswordResetService {
  constructor(
    private repo: PasswordResetRepository,
    private userService: UserService,
    private passwordHelper: PasswordHelper,
  ) {}

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

  async changePassword(input: PasswordServiceResetDto) {
    const availabilityCheck = await this.repo.checkIfRequestAvailableForUsage({
      id: input.id,
      userId: input.userId,
    });

    if (!availabilityCheck.available) {
      switch (availabilityCheck.code) {
        case RequestInaccessibilityReason.DOESNT_EXIST:
          throw new NotFoundException(availabilityCheck);
        case RequestInaccessibilityReason.ALREADY_USED:
          throw new ConflictException(availabilityCheck);
        case RequestInaccessibilityReason.DOESNT_BELONG_TO_USER:
          throw new ForbiddenException(availabilityCheck);
      }
    }

    const hashedPw = await this.passwordHelper.hashPassword(input.password);

    await this.userService.updateUserInfo({
      id: input.userId,
      password: hashedPw,
    });

    await this.repo.markRequestAsSuccess(input.id);
  }
}
