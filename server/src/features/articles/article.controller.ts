import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleCreateDto } from './dto/article-create.dto';

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

  @Delete('soft/:id')
  async softDelete(@Param('id', ParseUUIDPipe) id: string) {
    await this.service.softDeleteArticle(id);

    return { message: 'Article was soft-deleted successfully' };
  }
}
