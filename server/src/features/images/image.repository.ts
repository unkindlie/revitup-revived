import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from './image.entity';
import { Repository } from 'typeorm';
import { ImageUploadDto } from './dto';

@Injectable()
export class ImageRepository {
  constructor(@InjectRepository(Image) private repo: Repository<Image>) {}

  async createImageEntry(input: ImageUploadDto): Promise<string> {
    const result = await this.repo.insert(input);

    return result.identifiers[0].id as string;
  }
}
