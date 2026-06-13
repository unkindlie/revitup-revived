import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { FindOptionsWhere, ILike, IsNull, Repository } from 'typeorm';
import { ArticleCreateDto } from './dto/article-create.dto';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import {
  ARTICLES_SELECT_MANY_OBJ,
  ARTICLES_SELECT_ONE_OBJ,
} from './article.constants';
import { ArticleStatus } from './enums/article-status.enum';
import { ParagraphRepository } from '../paragraphs/paragraph.repository';

@Injectable()
export class ArticleRepository {
  constructor(
    @InjectRepository(Article) private repo: Repository<Article>,
    private paragraphRepo: ParagraphRepository,
  ) {}

  async findArticles(
    page: number = 1,
    take: number = 10,
    search?: string,
  ): Promise<[Article[], number]> {
    return this.repo.findAndCount({
      select: ARTICLES_SELECT_MANY_OBJ,
      where: {
        title: search ? ILike(`%${search}%`) : undefined,
        deletedAt: IsNull(),
        status: ArticleStatus.PUBLISHED,
      },
      order: {
        createdAt: 'DESC',
      },
      take,
      skip: (page - 1) * take,
      relations: ['discipline'],
    });
  }

  async findArticleById(id: number): Promise<Article> {
    const entity = await this.repo.findOne({
      select: ARTICLES_SELECT_ONE_OBJ,
      where: {
        id,
        deletedAt: IsNull(),
        status: ArticleStatus.PUBLISHED,
      },
      relations: ['paragraphs', 'discipline', 'author'],
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

  async getRandomArticle() {
    return await this.repo
      .createQueryBuilder('a')
      .select(['a.id', 'a.title', 'a.mainImgUrl'])
      .where('a.status = :status', { status: ArticleStatus.PUBLISHED })
      .orderBy('RANDOM()')
      .getOne();
  }

  async findDraftsByAuthor(authorId: number): Promise<Article[]> {
    return this.repo.find({
      where: {
        author: {
          id: authorId,
        },
        status: ArticleStatus.DRAFT,
      },
      order: {
        updatedAt: 'DESC',
      },
      select: ARTICLES_SELECT_MANY_OBJ,
    });
  }

  async findDraftById(id: number, userId: number) {
    const article = await this.repo.findOne({
      where: {
        id,
        status: ArticleStatus.DRAFT,
        author: {
          id: userId,
        },
      },
      relations: ['author', 'paragraphs', 'discipline'],
    });

    if (!article) {
      throw new NotFoundException(
        'Draft not found or you do not have access to it',
      );
    }

    return article;
  }

  async createArticle(
    article: ArticleCreateDto,
    authorId: number,
  ): Promise<void> {
    const { disciplineId, ...rest } = article;

    await this.repo.insert({
      ...rest,
      discipline: { id: disciplineId },
      author: { id: authorId },
    });
  }

  async updateArticle(
    id: number,
    partial: QueryDeepPartialEntity<Article> & {
      paragraphs?: {
        title: string;
        content: string;
        order: number;
      }[];
    },
  ): Promise<void> {
    const article = await this.repo.findOne({
      where: { id },
      relations: ['paragraphs', 'discipline'],
    });

    if (!article) {
      throw new NotFoundException('Article not found');
    }

    const { paragraphs, ...scalarFields } = partial;

    await this.repo.update(id, scalarFields);

    if (paragraphs) {
      await this.paragraphRepo.deleteForArticle(id);

      await this.paragraphRepo.createMany(
        paragraphs.map((p) => ({
          ...p,
          article: { id },
        })),
      );
    }
  }

  async softDeleteArticle(id: number): Promise<void> {
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
