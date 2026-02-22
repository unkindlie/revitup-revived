import { plainToInstance } from 'class-transformer';
import { Injectable, NotFoundException } from '@nestjs/common';

import { ThreadRepository } from './thread.repository';
import { ThreadShortDto } from './types/thread-short.dto';

@Injectable()
export class ThreadService {
  constructor(private repo: ThreadRepository) {}

  async getThreads(): Promise<ThreadShortDto[]> {
    return plainToInstance(ThreadShortDto, await this.repo.getThreads());
  }

  async getThreadById(id: number) {
    const thread = await this.repo.getThreadById(id);
    if (!thread) throw new NotFoundException("Such article doesn't exist");

    return thread;
  }
}
