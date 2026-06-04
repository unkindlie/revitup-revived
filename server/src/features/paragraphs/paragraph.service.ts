import { Injectable, NotFoundException } from '@nestjs/common';

import { ParagraphRepository } from './paragraph.repository';
import { ParagraphCreateDto } from './dto/paragraph-create.dto';
import { ParagraphUpdateDto } from './dto/paragraph-update.dto';

@Injectable()
export class ParagraphService {
  constructor(private readonly repo: ParagraphRepository) {}

  async findByArticle(articleId: number) {
    return this.repo.findByArticleId(articleId);
  }

  async create(dto: ParagraphCreateDto) {
    return this.repo.create({
      title: dto.title,
      content: dto.content,
      order: dto.order,
      article: {
        id: dto.articleId,
      },
    });
  }

  async createMany(dtoList: ParagraphCreateDto[]) {
    return this.repo.createMany(
      dtoList.map((dto) => ({
        title: dto.title,
        content: dto.content,
        order: dto.order,
        article: {
          id: dto.articleId,
        },
      })),
    );
  }

  async update(id: number, dto: ParagraphUpdateDto) {
    const exists = await this.repo.existsBy({ id });

    if (!exists) {
      throw new NotFoundException('Paragraph not found');
    }

    await this.repo.update(id, dto);
  }

  async delete(id: number) {
    const exists = await this.repo.existsBy({ id });

    if (!exists) {
      throw new NotFoundException('Paragraph not found');
    }

    await this.repo.delete(id);
  }
}
