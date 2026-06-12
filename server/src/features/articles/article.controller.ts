/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { ArticleService } from 'features/articles/article.service';
import { ArticleCreateDto } from './dto/article-create.dto';
import { ArticleEditDto } from './dto/article-edit.dto';
import { CurrentUser } from '../auth/decorators/user.decorator';
import { AccessTokenGuard } from '../auth/guards/access-token.guard';
import { UserPayloadDto } from '../auth/dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageFileFilter } from '../../common/file-upload/image-file.filter';
import { PaginatedQuery } from '../../common/types/pagination.type';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../user/enums/user-role.enum';

@Controller('articles')
export class ArticleController {
  constructor(private service: ArticleService) {}

  @Get()
  async getArticles(@Query() query: PaginatedQuery) {
    return this.service.findArticles(query.page ?? 1, query.take ?? 10);
  }

  @Get('random')
  async getRandomArticle() {
    return this.service.getRandomArticle();
  }

  @Get(':id')
  async findArticleById(@Param('id', ParseIntPipe) id: number) {
    return await this.service.findArticleById(id);
  }

  @Get('drafts/me')
  @UseGuards(AccessTokenGuard)
  async findMyDrafts(@CurrentUser() user: UserPayloadDto) {
    return this.service.findMyDrafts(user.id);
  }

  @Get('drafts/:id')
  @UseGuards(AccessTokenGuard)
  async getDraftById(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: UserPayloadDto,
  ) {
    return this.service.getDraftById(id, user.id);
  }

  @Post()
  @Roles([UserRole.EDITOR, UserRole.ADMIN])
  @UseGuards(AccessTokenGuard)
  async createArticle(
    @Body() article: ArticleCreateDto,
    @CurrentUser() user: UserPayloadDto,
  ) {
    await this.service.createArticle(article, user.id);

    return { message: 'Article was created successfully' };
  }

  @Patch('publish/:id')
  @Roles([UserRole.EDITOR, UserRole.ADMIN])
  @UseGuards(AccessTokenGuard)
  async publishArticle(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: UserPayloadDto,
  ) {
    await this.service.publishArticle(id, user.id);

    return { message: 'Article published successfully' };
  }

  @Patch('update/:id')
  @Roles([UserRole.EDITOR, UserRole.ADMIN])
  @UseGuards(AccessTokenGuard)
  @UseInterceptors(
    FileInterceptor('image', {
      fileFilter: imageFileFilter,
    }),
  )
  async updateArticle(
    @Param('id', ParseIntPipe) id: number,
    @Body() partialArticle: any,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    const body = {
      ...partialArticle,
      paragraphs: partialArticle.paragraphs
        ? JSON.parse(partialArticle.paragraphs)
        : undefined,
    } as ArticleEditDto;

    await this.service.updateArticle(id, body, file);

    return { message: 'Article was updated successfully' };
  }

  @Patch('revert-soft-delete/:id')
  @Roles([UserRole.EDITOR, UserRole.ADMIN])
  async revertSoftDelete(@Param('id', ParseIntPipe) id: number) {
    await this.service.revertSoftDelete(id);

    return { message: "Article's deletion is reverted" };
  }

  @Delete('soft/:id')
  @Roles([UserRole.EDITOR, UserRole.ADMIN])
  async softDelete(@Param('id', ParseIntPipe) id: number) {
    await this.service.softDeleteArticle(id);

    return { message: 'Article was soft-deleted successfully' };
  }
}
