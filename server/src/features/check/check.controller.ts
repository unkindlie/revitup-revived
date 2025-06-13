import {
    Body,
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { FirebaseStorageService } from '../../common/firebase/firebase-storage.service';
import { FileUploadDto } from '../../common/firebase/dto/file-upload.dto';

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
}
