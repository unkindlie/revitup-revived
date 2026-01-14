import { Injectable } from '@nestjs/common';
import { ArticleRepository } from './artice.repository';
import { Article } from './article.entity';

@Injectable()
export class ArticleService {
  constructor(private repo: ArticleRepository) {}

  async findArticles(): Promise<Article[]> {
    return await this.repo.findArticles();
  }
  async findArticleById(id: string): Promise<Article> {
    return await this.repo.findArticleById(id);
  }
}
