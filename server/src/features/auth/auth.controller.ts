import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { AuthService } from 'features/auth/auth.service';
import { Roles } from 'features/auth/decorators/roles.decorator';
import { CurrentUser } from 'features/auth/decorators/user.decorator';
import {
  AuthResponseDto,
  AuthRoleChangeDto,
  UserPayloadDto,
} from 'features/auth/dto';
import { AccessTokenGuard } from 'features/auth/guards/access-token.guard';
import { AlreadyAuthedGuard } from 'features/auth/guards/already-authed.guard';
import { LocalAuthGuard } from 'features/auth/guards/local-auth.guard';
import { RefreshTokenGuard } from 'features/auth/guards/refresh-token.guard';
import { LogoutInterceptor } from 'features/auth/interceptors/logout.interceptor';
import { RefreshCookieInterceptor } from 'features/auth/interceptors/refresh-cookie.interceptor';
import { UserCreateDto } from 'features/user/dto';
import { UserRole } from 'features/user/enums/user-role.enum';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { Response } from 'express';
import { CookieHelper } from './helpers/cookie.helper';
import {
  REFRESH_TOKEN_LIFE_IN_MS,
  REFRESH_TOKEN_NAME,
} from './constants/auth.constants';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';

@Controller('auth')
export class AuthController {
  constructor(
    private service: AuthService,
    private tokenService: RefreshTokenService,
    private cookieHelper: CookieHelper,
  ) {}

  @Post('register')
  async register(@Body() body: UserCreateDto) {
    await this.service.register(body);

    return { message: 'User was successfully created' };
  }

  @Post('login')
  @UseGuards(AlreadyAuthedGuard, LocalAuthGuard)
  @UseInterceptors(RefreshCookieInterceptor)
  login(@CurrentUser() payload: AuthResponseDto) {
    return payload;
  }

  @Post('logout')
  @UseGuards(AccessTokenGuard)
  @UseInterceptors(LogoutInterceptor)
  logout() {
    return { message: 'Successfully logged out' };
  }

  @Get('refresh')
  @UseGuards(RefreshTokenGuard)
  @UseInterceptors(RefreshCookieInterceptor)
  refresh(@CurrentUser() payload: AuthResponseDto) {
    return payload;
  }

  @Get('verify')
  @UseGuards(AccessTokenGuard)
  verifyUser(@CurrentUser() payload: UserPayloadDto) {
    return payload;
  }

  // ? Subject to change
  @Patch('change-role')
  @Roles([UserRole.ADMIN])
  @UseGuards(AccessTokenGuard)
  async changeUserRole(@Body() body: AuthRoleChangeDto) {
    await this.service.changeRole(body);

    return { message: "User's roles changed successfully" };
  }

  // ! Firstly the Roles decorator, then the guard
  @Get('role-checkup')
  @Roles([UserRole.ADMIN])
  @UseGuards(AccessTokenGuard)
  roleCheckup() {
    return { message: 'Roles work' };
  }

  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  googleLogin() {}

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleCallback(
    @CurrentUser() user: UserPayloadDto,
    @Res() res: Response,
  ) {
    const tokens = await this.service.generateTokens(user);

    // TODO: handle user availability check
    await this.tokenService.createTokenEntry(tokens.refreshToken);

    this.cookieHelper.setCookie({
      key: REFRESH_TOKEN_NAME,
      value: tokens.refreshToken,
      options: {
        maxAge: REFRESH_TOKEN_LIFE_IN_MS,
      },
      res,
    });
    res.redirect(
      process.env.FRONTEND_URL +
        `/google-auth?token=${encodeURIComponent(tokens.accessToken)}`,
    );
  }
}
