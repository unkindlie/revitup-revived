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

@Controller('articles')
export class ArticleController {
  constructor(private service: ArticleService) {}

  // TODO: add querying and page/take params
  @Get()
  async findArticles() {
    return await this.service.findArticles();
  }

  // TODO: swap UUID with article link
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
  async createArticle(@Body() article: ArticleCreateDto) {
    await this.service.createArticle(article);

    return { message: 'Article was created successfully' };
  }

  @Patch('update/:id')
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
  async revertSoftDelete(@Param('id', ParseIntPipe) id: number) {
    await this.service.revertSoftDelete(id);

    return { message: "Article's deletion is reverted" };
  }

  @Delete('soft/:id')
  async softDelete(@Param('id', ParseIntPipe) id: number) {
    await this.service.softDeleteArticle(id);

    return { message: 'Article was soft-deleted successfully' };
  }
}
