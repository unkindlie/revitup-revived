import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import authConfig from 'features/auth/auth.config';
import { AuthController } from 'features/auth/auth.controller';
import { AuthService } from 'features/auth/auth.service';
import { CookieHelper } from 'features/auth/helpers/cookie.helper';
import { TokenHelper } from 'features/auth/helpers/token.helper';
import { AccessTokenStrategy } from 'features/auth/strategies/access-token.strategy';
import { LocalStrategy } from 'features/auth/strategies/local.strategy';
import { RefreshTokenStrategy } from 'features/auth/strategies/refresh-token.strategy';
import { RefreshTokenModule } from 'features/refresh-token/refresh-token.module';
import { UserModule } from 'features/user/user.module';
import { PasswordHelper } from 'features/auth/helpers/password.helper';
import googleOauthConfig from 'features/auth/config/google-oauth.config';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  imports: [
    UserModule,
    RefreshTokenModule,
    ConfigModule.forFeature(authConfig),
    ConfigModule.forFeature(googleOauthConfig),
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    GoogleStrategy,
    CookieHelper,
    TokenHelper,
    PasswordHelper,
  ],
  exports: [TokenHelper, AuthService, PasswordHelper],
})
export class AuthModule {}
