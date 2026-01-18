import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { IsNull, Repository } from 'typeorm';
import { ArticleCreateDto } from './dto/article-create.dto';

@Injectable()
export class ArticleRepository {
  constructor(@InjectRepository(Article) private repo: Repository<Article>) {}

  async findArticles(): Promise<Article[]> {
    return await this.repo.find({
      select: {
        id: true,
        title: true,
        imageUrl: true,
        previewText: true,
        createdAt: true,
        updatedAt: true,
      },
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
        where: {
          id,
        },
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

  async softDeleteArticle(id: string): Promise<void> {
    const exists = await this.repo.existsBy({ id, deletedAt: IsNull() });
    if (!exists)
      throw new NotFoundException(
        'This article is already soft-deleted or may be removed from the portal',
      );

    await this.repo.softDelete(id);
  }
}
