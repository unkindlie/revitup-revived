import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { ArticleService } from './article.service';

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
  async findArticleById(@Param(ParseUUIDPipe) id: string) {
    return await this.service.findArticleById(id);
  }
}
