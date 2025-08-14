import { Module } from '@nestjs/common';

import { CheckModule } from './check/check.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';

@Module({
    imports: [CheckModule, UserModule, AuthModule, RefreshTokenModule],
})
export class FeaturesModule {}
