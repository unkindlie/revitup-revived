import { Module } from '@nestjs/common';

import { CacheModule } from '../../common/cache/cache.module';
import { FirebaseModule } from '../../common/firebase/firebase.module';
import { CheckController } from './check.controller';

@Module({
  imports: [FirebaseModule, CacheModule.register()],
  controllers: [CheckController],
})
export class CheckModule {}
