import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from 'features/user/user.controller';
import { UserEntity } from 'features/user/user.entity';
import { UserRepository } from 'features/user/user.repository';
import { UserService } from 'features/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
