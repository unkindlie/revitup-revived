import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';

@Module({
    imports: [UserModule, ConfigModule],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
