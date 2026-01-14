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

import { FileUploadDto } from '../../common/firebase/dto/file-upload.dto';
import { FirebaseStorageService } from '../../common/firebase/firebase-storage.service';

@Controller('check')
export class CheckController {
  constructor(private service: FirebaseStorageService) {}

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
    console.log(pathname);
    await this.service.uploadFile(new FileUploadDto(file, pathname));

    return { message: 'Good' };
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
}
