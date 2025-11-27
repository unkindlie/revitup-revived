import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { AuthService } from 'features/auth/auth.service';
import { Roles } from 'features/auth/decorators/roles.decorator';
import { AuthPayload } from 'features/auth/decorators/user.decorator';
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

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('register')
  async register(@Body() body: UserCreateDto) {
    await this.service.register(body);

    return { message: 'User was successfully created' };
  }

  @Post('login')
  @UseGuards(AlreadyAuthedGuard, LocalAuthGuard)
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

  // ? Subject to change
  @Patch('change-role')
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
}
