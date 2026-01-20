/* eslint-disable @typescript-eslint/no-unused-vars */
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { FirebaseStorageService } from 'common/firebase/firebase-storage.service';
import { ImageService } from '../images/image.service';

@Controller('check')
export class CheckController {
  constructor(
    private service: FirebaseStorageService,
    private imageService: ImageService,
  ) {}

  @Post('img')
  async getUrl(@Body('pathname') filePath: string) {
    const url = await this.service.getFileLink(filePath);

    return { url };
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('pathname') pathname: string,
  ) {
    const url = await this.imageService.uploadImage(file, pathname);

    return { url };
  }

  @Post('remove')
  async deleteFile(@Body('url') fileLink: string) {
    await this.service.deleteFile(fileLink);

    return { message: 'Good' };
  }

  @Get('cache')
  @UseInterceptors(CacheInterceptor)
  @CacheKey('hello')
  @CacheTTL(10000)
  async getCacheData() {
    await new Promise((resolve) => setTimeout(resolve, 3000));

    return { hello: 'world' };
  }

  @Post('img-info')
  @UseInterceptors(FileInterceptor('image'))
  getFileInfo(@UploadedFile() file: Express.Multer.File) {
    const { buffer, ...rest } = file;

    return { ...rest };
  }
}
