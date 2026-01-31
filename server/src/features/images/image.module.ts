import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from './image.entity';
import { FirebaseModule } from 'common/firebase/firebase.module';
import { ImageService } from './image.service';
import { ImageRepository } from './image.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Image]), FirebaseModule],
  providers: [ImageService, ImageRepository],
  exports: [ImageService],
})
export class ImageModule {}
