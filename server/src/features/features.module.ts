import { Module } from '@nestjs/common';

import { AuthModule } from 'features/auth/auth.module';
import { CheckModule } from 'features/check/check.module';
import { PasswordResetModule } from 'features/password-reset/password-reset.module';
import { RefreshTokenModule } from 'features/refresh-token/refresh-token.module';
import { UserModule } from 'features/user/user.module';
import { ArticleModule } from './articles/article.module';

@Module({
  imports: [
    CheckModule,
    UserModule,
    AuthModule,
    RefreshTokenModule,
    PasswordResetModule,
    ArticleModule,
  ],
})
export class FeaturesModule {}
