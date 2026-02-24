import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Thread } from 'features/threads/thread.entity';
import {
  THREAD_DETAILED_SELECT_OBJ,
  THREADS_SELECT_OBJ,
} from 'features/threads/constants/thread.contants';
import { ThreadCreateDto } from 'features/threads/types/thread-create.dto';

@Injectable()
export class ThreadRepository {
  constructor(
    @InjectRepository(Thread) private threadRepo: Repository<Thread>,
  ) {}

  // TODO: add pagination
  async getThreads(): Promise<Thread[]> {
    return await this.threadRepo.find({
      select: THREADS_SELECT_OBJ,
      order: {
        createdAt: 'DESC',
      },
      relations: ['author'],
    });
  }

  async getThreadById(id: number): Promise<Thread | null> {
    return await this.threadRepo.findOne({
      select: THREAD_DETAILED_SELECT_OBJ,
      relations: ['author'],
      where: { id },
      cache: 30000,
    });
  }

  async createThread(input: ThreadCreateDto, authorId: number): Promise<void> {
    await this.threadRepo.insert({ ...input, author: { id: authorId } });
  }
}
