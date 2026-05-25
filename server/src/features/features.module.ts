import { Module } from '@nestjs/common';

import { ArticleModule } from 'features/articles/article.module';
import { AuthModule } from 'features/auth/auth.module';
import { CheckModule } from 'features/check/check.module';
import { CommentModule } from 'features/comments/comment.module';
import { DisciplineModule } from 'features/disciplines/discipline.module';
import { EventModule } from 'features/events/event.module';
import { PasswordResetModule } from 'features/password-reset/password-reset.module';
import { ThreadModule } from 'features/threads/thread.module';
import { ThreadCategoryModule } from 'features/thread-categories/thread-category.module';
import { UserModule } from 'features/user/user.module';

@Module({
  imports: [
    CheckModule,
    UserModule,
    AuthModule,
    PasswordResetModule,
    ArticleModule,
    ThreadModule,
    ThreadCategoryModule,
    EventModule,
    CommentModule,
    DisciplineModule,
  ],
})
export class FeaturesModule {}
