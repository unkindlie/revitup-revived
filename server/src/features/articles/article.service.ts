import { Injectable, NotFoundException } from '@nestjs/common';
import { ArticleRepository } from './artice.repository';
import { Article } from './article.entity';
import { plainToInstance } from 'class-transformer';
import { ArticleShortDto } from './dto/article-short.dto';
import { ArticleCreateDto } from './dto/article-create.dto';
import { ArticleEditDto } from './dto/article-edit.dto';
import { NotNull } from '../../common/constants/database.constants';
import { FirebaseStorageService } from '../../common/firebase/firebase-storage.service';
import { ArticleStatus } from './enums/article-status.enum';
import { CommentService } from '../comments/comment.service';
import { CommentSource } from '../comments/types/comment-source.enum';

@Injectable()
export class ArticleService {
  constructor(
    private repo: ArticleRepository,
    private firebaseStorage: FirebaseStorageService,
    private commentService: CommentService,
  ) {}

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

  async createArticle(
    article: ArticleCreateDto,
    userId: number,
  ): Promise<void> {
    await this.repo.createArticle(article, userId);
  }

  async updateArticle(
    id: number,
    partialArticle: ArticleEditDto,
    file?: Express.Multer.File,
  ): Promise<void> {
    const { disciplineId, ...rest } = partialArticle;
    let imageUrl: string | undefined;

    if (file) {
      const path = await this.firebaseStorage.uploadFile({
        pathname: 'articles',
        originalName: file.originalname,
        buffer: file.buffer,
        metadata: { contentType: file.mimetype },
      });

      imageUrl = await this.firebaseStorage.getFileLink(path);
    }

    await this.repo.updateArticle(id, {
      ...rest,
      ...(imageUrl ? { mainImgUrl: imageUrl } : {}),
      ...(disciplineId ? { discipline: { id: disciplineId } } : {}),
    });
  }

  async publishArticle(id: number, userId: number): Promise<void> {
    const draft = await this.repo.findDraftById(id, userId);

    if (!draft) {
      throw new NotFoundException('Draft not found');
    }

    await this.repo.updateArticle(id, {
      status: ArticleStatus.PUBLISHED,
    });
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

    await this.commentService.removeCommentsForEntity({
      entityId: id,
      entitySource: CommentSource.ARTICLE,
    });
  }
}
