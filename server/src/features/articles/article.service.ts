import { Injectable } from '@nestjs/common';
import { ArticleRepository } from './artice.repository';
import { Article } from './article.entity';
import { plainToInstance } from 'class-transformer';
import { ArticleShortDto } from './dto/article-short.dto';

@Injectable()
export class ArticleService {
  constructor(private repo: ArticleRepository) {}

  async findArticles(): Promise<ArticleShortDto[]> {
    const articles = await this.repo.findArticles();

    return plainToInstance(ArticleShortDto, articles);
  }
  async findArticleById(id: string): Promise<Article> {
    return await this.repo.findArticleById(id);
  }
}
