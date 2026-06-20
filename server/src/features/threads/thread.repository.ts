import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { Thread } from 'features/threads/thread.entity';
import {
  THREAD_DETAILED_SELECT_OBJ,
  THREADS_SELECT_OBJ,
} from 'features/threads/constants/thread.contants';
import { ThreadCreateDto } from 'features/threads/types/thread-create.dto';
import { ThreadCategory } from 'features/thread-categories/thread-category.entity';

@Injectable()
export class ThreadRepository {
  constructor(
    @InjectRepository(Thread) private repo: Repository<Thread>,
    @InjectDataSource() private dataSource: DataSource,
  ) {}

  async getThreads(page = 1, take = 15): Promise<[Thread[], number]> {
    return this.repo.findAndCount({
      select: THREADS_SELECT_OBJ,
      order: {
        createdAt: 'DESC',
      },
      relations: ['author', 'category'],
      skip: (page - 1) * take,
      take,
    });
  }

  async getLatestThreads() {
    return this.repo.find({
      select: {
        id: true,
        title: true,
        category: {
          id: true,
          color: true,
        },
      },
      take: 5,
      order: {
        id: 'DESC',
      },
      relations: ['category'],
    });
  }

  async getThreadsByCategory(categoryCode: string) {
    const category = await this.dataSource
      .createQueryBuilder(ThreadCategory, 'tc')
      .where('tc.shortCode = :code', { code: categoryCode })
      .getOne();

    if (!category) throw new NotFoundException('Such category does not exist');

    const threads = await this.repo.find({
      select: THREADS_SELECT_OBJ,
      where: { category: { shortCode: categoryCode } },
      order: {
        createdAt: 'DESC',
      },
      relations: ['author', 'category'],
    });

    return { category, threads };
  }

  async getThreadById(id: number): Promise<Thread | null> {
    return await this.repo.findOne({
      select: THREAD_DETAILED_SELECT_OBJ,
      relations: ['author', 'category'],
      where: { id },
      cache: 30000,
    });
  }

  async createThread(input: ThreadCreateDto, authorId: number): Promise<void> {
    const { categoryId, ...rest } = input;
    await this.repo.insert({
      ...rest,
      author: { id: authorId },
      category: { id: categoryId },
    });
  }
}
