import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { ParseEmailPipe } from 'common/pipes/parse-email.pipe';
import { ParseStrongPasswordPipe } from 'common/pipes/parse-strong-password.pipe';

import { CurrentUser } from 'features/auth/decorators/user.decorator';
import { UserPayloadDto } from 'features/auth/dto';
import { AccessTokenGuard } from 'features/auth/guards/access-token.guard';
import { PasswordResetService } from 'features/auth/password-reset/password-reset.service';

@Controller('auth/password-reset')
export class PasswordResetController {
  constructor(private service: PasswordResetService) {}

  @Post('request')
  async createResetRequest(@Body('email', ParseEmailPipe) email: string) {
    const reqId = await this.service.createPasswordResetRequest(email);

    return { id: reqId };
  }

  @Patch('logged')
  @UseGuards(AccessTokenGuard)
  async changePasswordLogged(
    @Body('password', ParseStrongPasswordPipe) password: string,
    @CurrentUser() user: UserPayloadDto,
  ) {
    await this.service.changePasswordLogged({
      password,
      userId: user.id,
    });

    return { message: 'Password was changed successfully' };
  }

  @Patch(':id')
  async changePassword(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('password', ParseStrongPasswordPipe) password: string,
  ) {
    await this.service.changePassword({
      id,
      password,
    });

    return { message: 'Password was changed successfully' };
  }
}
