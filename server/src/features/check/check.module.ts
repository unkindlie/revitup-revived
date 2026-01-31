import { Module } from '@nestjs/common';

import { CacheModule } from '../../common/cache/cache.module';
import { FirebaseModule } from '../../common/firebase/firebase.module';
import { CheckController } from './check.controller';
import { ImageModule } from '../images/image.module';

@Module({
  imports: [FirebaseModule, CacheModule.register(), ImageModule],
  controllers: [CheckController],
})
export class CheckModule {}
