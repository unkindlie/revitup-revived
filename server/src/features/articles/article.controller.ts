import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleCreateDto } from './dto/article-create.dto';
import { ArticleEditDto } from './dto/article-edit.dto';

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
  async findArticleById(@Param('id', ParseUUIDPipe) id: string) {
    return await this.service.findArticleById(id);
  }

  @Post()
  async createArticle(@Body() article: ArticleCreateDto) {
    await this.service.createArticle(article);

    return { message: 'Article was created successfully' };
  }

  @Patch('update/:id')
  async updateArticle(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() partialArticle: ArticleEditDto,
  ) {
    await this.service.updateArticle(id, partialArticle);

    return { message: 'Article was soft-deleted successfully' };
  }

  @Patch('revert-soft-delete/:id')
  async revertSoftDelete(@Param('id', ParseUUIDPipe) id: string) {
    await this.service.revertSoftDelete(id);

    return { message: "Article's deletion is reverted" };
  }

  @Delete('soft/:id')
  async softDelete(@Param('id', ParseUUIDPipe) id: string) {
    await this.service.softDeleteArticle(id);

    return { message: 'Article was soft-deleted successfully' };
  }
}
