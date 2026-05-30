import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from 'features/auth/auth.module';
import { PasswordResetRequestEntity } from 'features/auth/password-reset/password-reset-request.entity';
import { PasswordResetController } from 'features/auth/password-reset/password-reset.controller';
import { PasswordResetRepository } from 'features/auth/password-reset/password-reset.repository';
import { PasswordResetService } from 'features/auth/password-reset/password-reset.service';
import { UserModule } from 'features/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PasswordResetRequestEntity]),
    forwardRef(() => AuthModule),
    UserModule,
  ],
  controllers: [PasswordResetController],
  providers: [PasswordResetService, PasswordResetRepository],
  exports: [PasswordResetService],
})
export class PasswordResetModule {}
