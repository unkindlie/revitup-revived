import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';

import { UserPayloadDto } from 'features/auth/dto';
import { AccessTokenGuard } from 'features/auth/guards/access-token.guard';
import { ThreadService } from 'features/threads/thread.service';
import { ThreadCreateDto } from 'features/threads/types/thread-create.dto';
import { CurrentUser } from '../auth/decorators/user.decorator';

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
  @UseGuards(AccessTokenGuard)
  async createThread(
    @Body() body: ThreadCreateDto,
    @CurrentUser() user: UserPayloadDto,
  ) {
    await this.service.createThread(body, user.id);

    return { message: 'Thread created successfully' };
  }
}
