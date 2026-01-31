import { Injectable } from '@nestjs/common';
import { UserImageRepository } from './user-image.repository';
import { ImageService } from '../images/image.service';

@Injectable()
export class UserImageService {
  constructor(
    private repo: UserImageRepository,
    private imageService: ImageService,
  ) {}

  async getUserImages(userId: number) {
    return await this.repo.getUserImages(userId);
  }

  async getLatestUserImage(userId: number): Promise<string | null> {
    return await this.repo.getLatestUserImage(userId);
  }

  async uploadUserImage(
    image: Express.Multer.File,
    userId: number,
  ): Promise<void> {
    const { id: imgId } = await this.imageService.uploadImage(
      image,
      `images/users/${userId}`,
    );

    await this.repo.insertUserImage(userId, imgId);
  }
}
