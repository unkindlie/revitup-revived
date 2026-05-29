import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AccessTokenStrategy } from 'features/auth/strategies/access-token.strategy';
import authConfig from 'features/auth/auth.config';
import googleOauthConfig from 'features/auth/config/google-oauth.config';
import { AuthController } from 'features/auth/auth.controller';
import { AuthService } from 'features/auth/auth.service';
import { CookieHelper } from 'features/auth/helpers/cookie.helper';
import { PasswordHelper } from 'features/auth/helpers/password.helper';
import { TokenHelper } from 'features/auth/helpers/token.helper';
import { PasswordResetModule } from 'features/auth/password-reset/password-reset.module';
import { RefreshTokenModule } from 'features/auth/refresh-token/refresh-token.module';
import { GoogleStrategy } from 'features/auth/strategies/google.strategy';
import { LocalStrategy } from 'features/auth/strategies/local.strategy';
import { RefreshTokenStrategy } from 'features/auth/strategies/refresh-token.strategy';
import { UserModule } from 'features/user/user.module';

@Module({
  imports: [
    UserModule,
    ConfigModule.forFeature(authConfig),
    ConfigModule.forFeature(googleOauthConfig),
    JwtModule.register({}),
    PasswordResetModule,
    RefreshTokenModule,
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
