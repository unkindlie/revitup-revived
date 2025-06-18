import { Module } from '@nestjs/common';
import { CheckModule } from './check/check.module';

@Module({
    imports: [CheckModule],
})
export class FeaturesModule {}
