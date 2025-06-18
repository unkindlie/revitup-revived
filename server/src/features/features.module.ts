import { Module } from '@nestjs/common';

import { CheckModule } from './check/check.module';
import { UserModule } from './user/user.module';

@Module({
    imports: [CheckModule, UserModule],
})
export class FeaturesModule {}
