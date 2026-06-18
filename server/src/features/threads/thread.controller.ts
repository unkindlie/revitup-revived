import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { UserPayloadDto } from 'features/auth/dto';
import { CurrentUser } from 'features/auth/decorators/user.decorator';
import { AccessTokenGuard } from 'features/auth/guards/access-token.guard';
import { ThreadService } from 'features/threads/thread.service';
import { ThreadCreateDto } from 'features/threads/types/thread-create.dto';
import { PaginatedQuery } from '../../common/types/pagination.type';

@Controller('threads')
export class ThreadController {
  constructor(private service: ThreadService) {}

  @Get()
  async getThreads(@Query() query: PaginatedQuery) {
    const [threads, totalCount] = await this.service.getThreads(query);

    return {
      items: threads,
      totalCount,
      query: {
        ...query,
        totalPages: Math.ceil(totalCount / (query.take ?? 1)),
      },
    };
  }

  @Get('latest')
  async getLatestThreads() {
    return this.service.getLatestThreads();
  }

  @Get('by-category/:code')
  async getThreadsByCategory(@Param('code') code: string) {
    return this.service.getThreadsByCategoryCode(code);
  }

  @Get(':id')
  async getThreadById(@Param('id', ParseIntPipe) id: number) {
    return this.service.getThreadById(id);
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
