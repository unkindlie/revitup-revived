import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ThreadService } from './thread.service';

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
}
