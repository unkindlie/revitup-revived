import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArticleRepository {
  constructor(@InjectRepository(Article) private repo: Repository<Article>) {}

  async findArticles(): Promise<Article[]> {
    return await this.repo.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }
  // TODO: add "not available" if soft deleted
  async findArticleById(id: string): Promise<Article> {
    const entity = await this.repo.findOne({
      where: { id },
    });
    if (!entity) throw new NotFoundException('This article does not exist');

    return entity;
  }
}
