import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { RequestSource } from './enums/request-source.enum';
import { PasswordResetRepository } from './password-reset.repository';
import {
  PasswordServiceLoggedRequestDto,
  PasswordServiceResetDto,
} from './dto/password-reset.dto';
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

  async createPasswordResetRequest(email: string): Promise<void> {
    const user = await this.userService.getUserByEmail(email);
    const would = await this.repo.checkIfPossibleToCreateNewRequest(user.id);

    if (!would)
      throw new ForbiddenException(
        'You have used your request limit; please try later',
      );

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
