import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { AccessTokenGuard } from '../auth/guards/access-token.guard';
import { PasswordResetService } from './password-reset.service';
import { ParseEmailPipe } from '../../common/pipes/parse-email.pipe';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { UserPayloadDto } from '../auth/dto';
import { ParseStrongPasswordPipe } from '../../common/pipes/parse-strong-password.pipe';

@Controller('auth/password-reset')
export class PasswordResetController {
  constructor(private service: PasswordResetService) {}

  @Post('request')
  async createResetRequest(@Body('email', ParseEmailPipe) email: string) {
    await this.service.createPasswordResetRequest(email);

    return { message: 'Password reset request created successfully' };
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
