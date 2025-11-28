import {
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
  async changePassword(@Param('id', ParseUUIDPipe) id: string) {
    
  }
}
