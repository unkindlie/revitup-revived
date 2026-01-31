import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserImage } from './user-image.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserImageRepository {
  constructor(
    @InjectRepository(UserImage) private repo: Repository<UserImage>,
  ) {}

  async getLatestUserImage(userId: number): Promise<string | null> {
    const userImage = await this.repo.findOne({
      select: {
        image: { id: true, url: true },
      },
      where: {
        user: { id: userId },
      },
      order: {
        createdAt: 'DESC',
      },
      relations: ['image'],
    });

    return userImage?.image.url ?? null;
  }

  async getUserImages(userId: number) {
    return (
      await this.repo.find({
        select: {
          image: {
            id: true,
            url: true,
            createdAt: true,
          },
          userId: false,
        },
        where: {
          user: { id: userId },
        },
        order: {
          createdAt: 'DESC',
        },
        relations: ['image'],
      })
    ).map((i) => i.image);
  }

  async insertUserImage(userId: number, imageId: string): Promise<void> {
    await this.repo.insert({
      image: { id: imageId },
      user: { id: userId },
    });
  }
}
