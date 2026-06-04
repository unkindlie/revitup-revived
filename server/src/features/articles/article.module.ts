import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './article.entity';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { ArticleRepository } from './artice.repository';
import { ParagraphModule } from '../paragraphs/paragraph.module';
import { FirebaseModule } from '../../common/firebase/firebase.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Article]),
    ParagraphModule,
    FirebaseModule,
  ],
  controllers: [ArticleController],
  providers: [ArticleService, ArticleRepository],
})
export class ArticleModule {}
