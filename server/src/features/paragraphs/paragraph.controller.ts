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
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../user/enums/user-role.enum';

@Controller('paragraphs')
export class ParagraphController {
  constructor(private readonly service: ParagraphService) {}

  @Get('article/:articleId')
  async findByArticle(@Param('articleId', ParseIntPipe) articleId: number) {
    return this.service.findByArticle(articleId);
  }

  @Post()
  @Roles([UserRole.EDITOR, UserRole.ADMIN])
  async create(@Body() dto: ParagraphCreateDto) {
    await this.service.create(dto);

    return { message: 'Paragraph created successfully' };
  }

  @Post('bulk')
  @Roles([UserRole.EDITOR, UserRole.ADMIN])
  async createMany(@Body() dtoList: ParagraphCreateDto[]) {
    await this.service.createMany(dtoList);

    return { message: 'Paragraphs created successfully' };
  }

  @Patch(':id')
  @Roles([UserRole.EDITOR, UserRole.ADMIN])
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ParagraphUpdateDto,
  ) {
    await this.service.update(id, dto);

    return { message: 'Paragraph updated successfully' };
  }

  @Delete(':id')
  @Roles([UserRole.EDITOR, UserRole.ADMIN])
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.service.delete(id);

    return { message: 'Paragraph deleted successfully' };
  }
}
