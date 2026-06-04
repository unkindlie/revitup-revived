import { Injectable, NotFoundException } from '@nestjs/common';
import { ArticleRepository } from './artice.repository';
import { Article } from './article.entity';
import { plainToInstance } from 'class-transformer';
import { ArticleShortDto } from './dto/article-short.dto';
import { ArticleCreateDto } from './dto/article-create.dto';
import { ArticleEditDto } from './dto/article-edit.dto';
import { NotNull } from '../../common/constants/database.constants';

@Injectable()
export class ArticleService {
  constructor(private repo: ArticleRepository) {}

  async findArticles(): Promise<ArticleShortDto[]> {
    const articles = await this.repo.findArticles();

    return plainToInstance(ArticleShortDto, articles);
  }

  async findArticleById(id: number): Promise<Article> {
    return await this.repo.findArticleById(id);
  }

  async findMyDrafts(userId: number) {
    return this.repo.findDraftsByAuthor(userId);
  }

  async getDraftById(articleId: number, userId: number) {
    return this.repo.findDraftById(articleId, userId);
  }

  async createArticle(article: ArticleCreateDto): Promise<void> {
    await this.repo.createArticle(article);
  }

  async updateArticle(
    id: number,
    partialArticle: ArticleEditDto,
  ): Promise<void> {
    await this.repo.updateArticle(id, partialArticle);
  }

  async revertSoftDelete(id: number): Promise<void> {
    const isAvailableForRevertion = await this.repo.existsBy({
      id,
      deletedAt: NotNull,
    });
    if (isAvailableForRevertion)
      throw new NotFoundException('Such article may already exist/not exist');

    await this.repo.updateArticle(id, { deletedAt: null });
  }

  async softDeleteArticle(id: number): Promise<void> {
    await this.repo.softDeleteArticle(id);
  }
}
