import { plainToInstance } from 'class-transformer';
import { Injectable, NotFoundException } from '@nestjs/common';

import { ThreadRepository } from 'features/threads/thread.repository';
import { ThreadShortDto } from 'features/threads/types/thread-short.dto';
import { ThreadCreateDto } from 'features/threads/types/thread-create.dto';
import { ThreadsFromCategoryDto } from './types/threads-from-category.dto';

@Injectable()
export class ThreadService {
  constructor(private repo: ThreadRepository) {}

  async getThreads(): Promise<ThreadShortDto[]> {
    return plainToInstance(ThreadShortDto, await this.repo.getThreads());
  }

  async getThreadsByCategoryCode(
    code: string,
  ): Promise<ThreadsFromCategoryDto> {
    return this.repo.getThreadsByCategory(code);
  }

  async getLatestThreads() {
    return this.repo.getLatestThreads();
  }

  async getThreadById(id: number) {
    const thread = await this.repo.getThreadById(id);
    if (!thread) throw new NotFoundException("Such article doesn't exist");

    return thread;
  }

  async createThread(input: ThreadCreateDto, authorId: number): Promise<void> {
    await this.repo.createThread(input, authorId);
  }
}
