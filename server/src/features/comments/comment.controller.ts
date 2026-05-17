import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';

import { CurrentUser } from 'features/auth/decorators/user.decorator';
import { UserPayloadDto } from 'features/auth/dto';
import { AccessTokenGuard } from 'features/auth/guards/access-token.guard';

import { CommentService } from 'features/comments/comment.service';
import { CommentCreateDto, CommentGetQueryDto } from 'features/comments/dto';

@Controller('comments')
export class CommentController {
  constructor(private service: CommentService) {}

  @Get()
  async getCommentsForEntity(@Query() query: CommentGetQueryDto) {
    return this.service.getCommentsForEntity(query);
  }

  @Get('all')
  async getComments() {
    return this.service.getComments();
  }

  @Post()
  @UseGuards(AccessTokenGuard)
  async createComment(
    @Body() body: CommentCreateDto,
    @CurrentUser() user: UserPayloadDto,
  ) {
    await this.service.createComment(body, user.id);

    return { message: 'Comment created successfully' };
  }
}
