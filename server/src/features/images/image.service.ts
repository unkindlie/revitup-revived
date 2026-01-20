import { Injectable } from '@nestjs/common';
import { ImageRepository } from 'features/images/image.repository';
import { FirebaseStorageService } from 'common/firebase/firebase-storage.service';
import { FileUploadDto } from 'common/firebase/dto/file-upload.dto';
import { join } from 'path';

@Injectable()
export class ImageService {
  constructor(
    private repo: ImageRepository,
    private storageService: FirebaseStorageService,
  ) {}

  async uploadImage(image: Express.Multer.File, pathname: string) {
    await this.storageService.uploadFile(new FileUploadDto(image, pathname));

    const { originalname, mimetype, size } = image;
    const url = await this.storageService.getFileLink(
      join(pathname, '/', image.originalname),
    );

    await this.repo.createImageEntry({
      fileName: originalname,
      fileType: mimetype,
      bytesSize: size,
      url,
    });

    return url;
  }
}
