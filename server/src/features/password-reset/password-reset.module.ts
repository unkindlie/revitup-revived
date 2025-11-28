import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PasswordResetRequestEntity } from './password-reset-request.entity';
import { PasswordResetController } from './password-reset.controller';
import { PasswordResetRepository } from './password-reset.repository';
import { PasswordResetService } from './password-reset.service';

@Module({
  imports: [TypeOrmModule.forFeature([PasswordResetRequestEntity])],
  controllers: [PasswordResetController],
  providers: [PasswordResetService, PasswordResetRepository],
  exports: [PasswordResetService],
})
export class PasswordResetModule {}
