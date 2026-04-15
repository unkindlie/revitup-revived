import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

import { ThreadCategoryRepository } from 'features/thread-categories/thread-category.repository';
import { ThreadCategoryShortDto } from 'features/thread-categories/dto/thread-category-short.dto';

@Injectable()
export class ThreadCategoryService {
  constructor(private repo: ThreadCategoryRepository) {}

  async getThreadCategories(): Promise<ThreadCategoryShortDto[]> {
    return plainToInstance(
      ThreadCategoryShortDto,
      await this.repo.getThreadCategories(),
    );
  }
}
