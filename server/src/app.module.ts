import { Module } from '@nestjs/common';

import { CommonModule } from './common/common.module';
import { FeaturesModule } from './features/features.module';

@Module({
    imports: [CommonModule, FeaturesModule],
})
export class AppModule {}
