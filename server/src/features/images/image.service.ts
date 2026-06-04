import { Injectable, NotFoundException } from '@nestjs/common';

import { FirebaseStorageService } from 'common/firebase/firebase-storage.service';
import { FileUploadDto } from 'common/firebase/dto/file-upload.dto';

import { ImageRepository } from 'features/images/image.repository';

@Injectable()
export class ImageService {
  constructor(
    private repo: ImageRepository,
    private storageService: FirebaseStorageService,
  ) {}

  async uploadImage(
    image: Express.Multer.File,
    pathname: string,
  ): Promise<{ id: string; url: string }> {
    const filePathname = await this.storageService.uploadFile(
      new FileUploadDto(image, pathname),
    );

    const { originalname, mimetype, size } = image;
    const url = await this.storageService.getFileLink(filePathname);

    const id = await this.repo.createImageEntry({
      fileName: originalname,
      fileType: mimetype,
      bytesSize: size,
      url,
    });

    return { id, url };
  }

  async deleteImageById(id: string): Promise<void> {
    const img = await this.repo.findById(id);
    if (!img) throw new NotFoundException('Image not found');

    // remove from storage first
    await this.storageService.deleteFile(img.url);

    // delete DB entry
    await this.repo.deleteById(id);
  }
}
