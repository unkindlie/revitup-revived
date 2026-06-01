import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SearchController } from 'features/search/search.controller';
import { SearchService } from 'features/search/search.service';
import { Article } from 'features/articles/article.entity';
import { Event } from 'features/events/event.entity';
import { DisciplineEntity } from 'features/disciplines/discipline.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Article, Event, DisciplineEntity])],
  controllers: [SearchController],
  providers: [SearchService],
  exports: [SearchService],
})
export class SearchModule {}
