import { Module } from '@nestjs/common';

import { CheckModule } from './check/check.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [CheckModule, UserModule, AuthModule],
})
export class FeaturesModule {}
