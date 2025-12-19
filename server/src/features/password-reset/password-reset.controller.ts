import {
  Body,
  Controller,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { AuthPayload } from '../auth/decorators/user.decorator';
import { UserPayloadDto } from '../auth/dto';
import { AccessTokenGuard } from '../auth/guards/access-token.guard';
import { RequestSource } from './enums/request-source.enum';
import { PasswordResetService } from './password-reset.service';
import { PasswordResetDto } from './dto/password-reset.dto';

@Controller('auth/password-reset')
export class PasswordResetController {
  constructor(private service: PasswordResetService) {}

  @Post('request')
  @UseGuards(AccessTokenGuard)
  async createResetRequest(@AuthPayload() user: UserPayloadDto) {
    await this.service.createPasswordResetRequest(
      user.id,
      RequestSource.BY_EMAIL,
    );

    return { message: 'Password reset request created successfully' };
  }

  @Patch(':id')
  @UseGuards(AccessTokenGuard)
  async changePassword(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: PasswordResetDto,
    @AuthPayload() payload: UserPayloadDto,
  ) {
    await this.service.changePassword({
      id,
      userId: payload.id,
      password: body.password,
    });

    return { message: 'Password was changed successfully' };
  }
}
