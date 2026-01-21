import { Module } from '@nestjs/common';
import { ImageModule } from '../images/image.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserImage } from './user-image.entity';
import { UserImageRepository } from './user-image.repository';
import { UserImageService } from './user-image.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserImage]), ImageModule],
  providers: [UserImageService, UserImageRepository],
  exports: [UserImageService],
})
export class UserImageModule {}
