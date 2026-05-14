import { Module } from '@nestjs/common';

import { AuthModule } from 'features/auth/auth.module';
import { CheckModule } from 'features/check/check.module';
import { EventModule } from 'features/events/event.module';
import { PasswordResetModule } from 'features/password-reset/password-reset.module';
import { RefreshTokenModule } from 'features/refresh-token/refresh-token.module';
import { UserModule } from 'features/user/user.module';
import { ArticleModule } from 'features/articles/article.module';
import { ThreadModule } from 'features/threads/thread.module';
import { ThreadCategoryModule } from 'features/thread-categories/thread-category.module';

@Module({
  imports: [
    CheckModule,
    UserModule,
    AuthModule,
    RefreshTokenModule,
    PasswordResetModule,
    ArticleModule,
    ThreadModule,
    ThreadCategoryModule,
    EventModule,
  ],
})
export class FeaturesModule {}
