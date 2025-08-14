import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RefreshTokenEntity } from './refresh-token.entity';
import { AuthModule } from '../auth/auth.module';
import { RefreshTokenRepository } from './refresh-token.repository';
import { RefreshTokenService } from './refresh-token.service';

@Module({
    imports: [TypeOrmModule.forFeature([RefreshTokenEntity]), AuthModule],
    providers: [RefreshTokenService, RefreshTokenRepository],
})
export class RefreshTokenModule {}
