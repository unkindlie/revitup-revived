import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'features/auth/auth.module';
import { RefreshTokenEntity } from 'features/refresh-token/refresh-token.entity';
import { RefreshTokenRepository } from 'features/refresh-token/refresh-token.repository';
import { RefreshTokenService } from 'features/refresh-token/refresh-token.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RefreshTokenEntity]),
    forwardRef(() => AuthModule),
  ],
  providers: [RefreshTokenService, RefreshTokenRepository],
  exports: [RefreshTokenService],
})
export class RefreshTokenModule {}
