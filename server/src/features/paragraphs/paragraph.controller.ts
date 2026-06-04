import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ParagraphService } from './paragraph.service';

@Controller('paragraphs')
export class ParagraphController {
  constructor(private service: ParagraphService) {}

  @Get('article/:articleId')
  findByArticle(@Param('articleId', ParseIntPipe) articleId: number) {
    return this.service.findByArticle(articleId);
  }
}
