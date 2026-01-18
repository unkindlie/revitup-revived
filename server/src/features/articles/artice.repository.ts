import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { FindOptionsWhere, IsNull, Repository } from 'typeorm';
import { ArticleCreateDto } from './dto/article-create.dto';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { ARTICLES_SELECT_OBJ } from './article.constants';

@Injectable()
export class ArticleRepository {
  constructor(@InjectRepository(Article) private repo: Repository<Article>) {}

  async findArticles(): Promise<Article[]> {
    return await this.repo.find({
      select: ARTICLES_SELECT_OBJ,
      where: {
        deletedAt: IsNull(),
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }
  async findArticleById(id: string): Promise<Article> {
    const entity = await this.repo.findOne({
      where: { id, deletedAt: IsNull() },
    });
    if (!entity) {
      const isSoftDeleted = await this.repo.exists({
        where: { id },
        withDeleted: true,
      });

      throw new NotFoundException(
        isSoftDeleted
          ? 'This article is currently unavailable, please check later'
          : 'Such article does not exist',
      );
    }

    return entity;
  }
  async createArticle(article: ArticleCreateDto): Promise<void> {
    await this.repo.insert(article);
  }
  async updateArticle(
    id: string,
    partial: QueryDeepPartialEntity<Article>,
  ): Promise<void> {
    await this.repo.update(id, partial);
  }
  async softDeleteArticle(id: string): Promise<void> {
    const exists = await this.repo.existsBy({ id, deletedAt: IsNull() });
    if (!exists)
      throw new NotFoundException(
        'This article is already soft-deleted or may be removed from the portal',
      );

    await this.repo.softDelete(id);
  }
  async existsBy(options: FindOptionsWhere<Article>) {
    return await this.repo.existsBy(options);
  }
}
