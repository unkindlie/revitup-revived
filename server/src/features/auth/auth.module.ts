import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { AccessTokenStrategy } from './strategies/access-token.strategy';

@Module({
    imports: [UserModule, ConfigModule, JwtModule.register({})],
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, AccessTokenStrategy],
})
export class AuthModule {}
