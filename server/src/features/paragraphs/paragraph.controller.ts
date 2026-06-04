import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

import { ParagraphService } from './paragraph.service';
import { ParagraphCreateDto } from './dto/paragraph-create.dto';
import { ParagraphUpdateDto } from './dto/paragraph-update.dto';

@Controller('paragraphs')
export class ParagraphController {
  constructor(private readonly service: ParagraphService) {}

  @Get('article/:articleId')
  async findByArticle(@Param('articleId', ParseIntPipe) articleId: number) {
    return this.service.findByArticle(articleId);
  }

  @Post()
  async create(@Body() dto: ParagraphCreateDto) {
    await this.service.create(dto);

    return { message: 'Paragraph created successfully' };
  }

  @Post('bulk')
  async createMany(@Body() dtoList: ParagraphCreateDto[]) {
    await this.service.createMany(dtoList);

    return { message: 'Paragraphs created successfully' };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ParagraphUpdateDto,
  ) {
    await this.service.update(id, dto);

    return { message: 'Paragraph updated successfully' };
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.service.delete(id);

    return { message: 'Paragraph deleted successfully' };
  }
}
