import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ParagraphEntity } from './paragraph.entity';
import { ParagraphService } from './paragraph.service';
import { ParagraphRepository } from './paragraph.repository';
import { ParagraphController } from './paragraph.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ParagraphEntity])],
  controllers: [ParagraphController],
  providers: [ParagraphService, ParagraphRepository],
  exports: [ParagraphService],
})
export class ParagraphModule {}
