import { Injectable } from '@nestjs/common';
import { ArticleRepository } from './artice.repository';
import { Article } from './article.entity';
import { plainToInstance } from 'class-transformer';
import { ArticleShortDto } from './dto/article-short.dto';
import { ArticleCreateDto } from './dto/article-create.dto';

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
  async createArticle(article: ArticleCreateDto): Promise<void> {
    await this.repo.createArticle(article);
  }
  async softDeleteArticle(id: string): Promise<void> {
    await this.repo.softDeleteArticle(id);
  }
}
