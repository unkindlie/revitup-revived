import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { CookieHelper } from './helpers/cookie.helper';
import { TokenHelper } from './helpers/token.helper';
import authConfig from './auth.config';

@Module({
    imports: [
        UserModule,
        ConfigModule.forFeature(authConfig),
        JwtModule.register({}),
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        LocalStrategy,
        AccessTokenStrategy,
        CookieHelper,
        TokenHelper,
    ],
})
export class AuthModule {}
