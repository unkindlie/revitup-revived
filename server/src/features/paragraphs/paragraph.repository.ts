import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeepPartial } from 'typeorm';

import { ParagraphEntity } from './paragraph.entity';

@Injectable()
export class ParagraphRepository {
  constructor(
    @InjectRepository(ParagraphEntity)
    private readonly repo: Repository<ParagraphEntity>,
  ) {}

  async findByArticleId(articleId: number): Promise<ParagraphEntity[]> {
    return this.repo.find({
      where: {
        article: {
          id: articleId,
        },
      },
      order: {
        order: 'ASC',
      },
    });
  }

  async create(entity: DeepPartial<ParagraphEntity>): Promise<ParagraphEntity> {
    const paragraph = this.repo.create(entity);
    return this.repo.save(paragraph);
  }

  async createMany(
    entities: DeepPartial<ParagraphEntity>[],
  ): Promise<ParagraphEntity[]> {
    const paragraphs = this.repo.create(entities);
    return this.repo.save(paragraphs);
  }

  async update(
    id: number,
    partial: DeepPartial<ParagraphEntity>,
  ): Promise<void> {
    await this.repo.update(id, partial);
  }

  async delete(id: number): Promise<void> {
    await this.repo.delete(id);
  }

  async existsBy(where: Partial<ParagraphEntity>): Promise<boolean> {
    return this.repo.existsBy(where);
  }
}
