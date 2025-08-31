import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { AuthService } from 'features/auth/auth.service';
import { AuthPayload } from 'features/auth/decorators/user.decorator';
import { AuthResponseDto } from 'features/auth/dto/auth-response.dto';
import { UserPayloadDto } from 'features/auth/dto/user-payload.dto';
import { AccessTokenGuard } from 'features/auth/guards/access-token.guard';
import { LocalAuthGuard } from 'features/auth/guards/local-auth.guard';
import { RefreshTokenGuard } from 'features/auth/guards/refresh-token.guard';
import { LogoutInterceptor } from 'features/auth/interceptors/logout.interceptor';
import { RefreshCookieInterceptor } from 'features/auth/interceptors/refresh-cookie.interceptor';
import { UserCreateDto } from 'features/user/dto/user-create.dto';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('register')
  async register(@Body() body: UserCreateDto) {
    await this.service.register(body);

    return { message: 'User was successfully created' };
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @UseInterceptors(RefreshCookieInterceptor)
  login(@AuthPayload() payload: AuthResponseDto) {
    return payload;
  }

  @Post('logout')
  @UseGuards(AccessTokenGuard)
  @UseInterceptors(LogoutInterceptor)
  logout() {
    return { message: 'Successfully logged out' };
  }

  @Get('verify')
  @UseGuards(AccessTokenGuard)
  verifyUser(@AuthPayload() payload: UserPayloadDto) {
    return payload;
  }

  @Get('refresh')
  @UseGuards(RefreshTokenGuard)
  @UseInterceptors(RefreshCookieInterceptor)
  refresh(@AuthPayload() payload: AuthResponseDto) {
    return payload;
  }
}
