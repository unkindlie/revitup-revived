import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';

import { ThreadService } from 'features/threads/thread.service';
import { ThreadCreateDto } from 'features/threads/types/thread-create.dto';

@Controller('threads')
export class ThreadController {
  constructor(private service: ThreadService) {}

  @Get()
  async getThreads() {
    return await this.service.getThreads();
  }

  @Get(':id')
  async getThreadById(@Param('id', ParseIntPipe) id: number) {
    return await this.service.getThreadById(id);
  }

  @Post()
  async createThread(@Body() body: ThreadCreateDto) {
    await this.service.createThread(body);

    return { message: 'Thread created successfully' };
  }
}
