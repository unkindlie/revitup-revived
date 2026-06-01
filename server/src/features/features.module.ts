import { Module } from '@nestjs/common';

import { ArticleModule } from 'features/articles/article.module';
import { AuthModule } from 'features/auth/auth.module';
import { CheckModule } from 'features/check/check.module';
import { CircuitModule } from 'features/circuits/circuit.module';
import { CommentModule } from 'features/comments/comment.module';
import { DisciplineModule } from 'features/disciplines/discipline.module';
import { EventModule } from 'features/events/event.module';
import { StatisticsModule } from 'features/statistics/statistics.module';
import { ThreadModule } from 'features/threads/thread.module';
import { ThreadCategoryModule } from 'features/thread-categories/thread-category.module';
import { UserModule } from 'features/user/user.module';
import { SearchModule } from 'features/search/search.module';

@Module({
  imports: [
    CheckModule,
    UserModule,
    AuthModule,
    ArticleModule,
    ThreadModule,
    ThreadCategoryModule,
    EventModule,
    CommentModule,
    DisciplineModule,
    SearchModule,
    StatisticsModule,
    CircuitModule,
  ],
})
export class FeaturesModule {}
