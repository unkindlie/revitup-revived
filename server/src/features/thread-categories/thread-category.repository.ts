import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

import { ThreadCategory } from 'features/thread-categories/thread-category.entity';
import { THREAD_CATEGORIES_SELECT_MANY_OBJ } from 'features/thread-categories/constants/thread-category.constants';

@Injectable()
export class ThreadCategoryRepository {
  constructor(
    @InjectRepository(ThreadCategory)
    private repo: Repository<ThreadCategory>,
  ) {}

  async getThreadCategories(): Promise<ThreadCategory[]> {
    return this.repo.find({
      select: THREAD_CATEGORIES_SELECT_MANY_OBJ,
    });
  }

  async getThreadCategoryByCondition(
    condition: FindOptionsWhere<ThreadCategory>,
  ): Promise<ThreadCategory | null> {
    return this.repo.findOneBy(condition);
  }
}
