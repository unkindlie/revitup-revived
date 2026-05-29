import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PasswordHelper } from 'features/auth/helpers/password.helper';
import {
  PasswordServiceLoggedRequestDto,
  PasswordServiceResetDto,
} from 'features/auth/password-reset/dto/password-reset.dto';
import { RequestInaccessibilityReason } from 'features/auth/password-reset/enums/request-not-available-reason.enum';
import { RequestSource } from 'features/auth/password-reset/enums/request-source.enum';
import { PasswordResetRepository } from 'features/auth/password-reset/password-reset.repository';
import { UserService } from 'features/user/user.service';

@Injectable()
export class PasswordResetService {
  constructor(
    private repo: PasswordResetRepository,
    private userService: UserService,
    private passwordHelper: PasswordHelper,
  ) {}

  async createPasswordResetRequest(email: string): Promise<void> {
    const user = await this.userService.getUserByEmail(email);
    const would = await this.repo.checkIfPossibleToCreateNewRequest(user.id);

    if (!would)
      throw new ForbiddenException({
        message: 'You have used your request limit; please try later',
        fields: { email: 'req_limit_exhausted' },
      });

    await this.repo.createResetRequest(user.id, RequestSource.BY_EMAIL);
  }

  async changePassword(input: PasswordServiceResetDto) {
    const {
      user: { id: userId },
    } = await this.repo.findRequestById(input.id);

    const availabilityCheck = await this.repo.checkIfRequestAvailableForUsage(
      input.id,
    );

    if (!availabilityCheck.available) {
      switch (availabilityCheck.code) {
        case RequestInaccessibilityReason.DOESNT_EXIST:
          throw new NotFoundException(availabilityCheck);
        case RequestInaccessibilityReason.ALREADY_USED:
          throw new ConflictException(availabilityCheck);
      }
    }

    const hashedPw = await this.passwordHelper.hashPassword(input.password);

    await this.userService.updateUserInfo({
      id: userId,
      password: hashedPw,
    });

    await this.repo.markRequestAsSuccess(input.id);
  }

  async changePasswordLogged(input: PasswordServiceLoggedRequestDto) {
    const resetRequestId = await this.repo.createResetRequest(
      input.userId,
      RequestSource.LOGGED,
    );

    const hashedPw = await this.passwordHelper.hashPassword(input.password);

    await this.userService.updateUserInfo({
      id: input.userId,
      password: hashedPw,
    });

    await this.repo.markRequestAsSuccess(resetRequestId);
  }
}
