import { Module } from '@nestjs/common';

import { FirebaseModule } from '../../common/firebase/firebase.module';
import { CheckController } from './check.controller';
import { CacheModule } from '../../common/cache/cache.module';

@Module({
    imports: [FirebaseModule, CacheModule.register()],
    controllers: [CheckController],
})
export class CheckModule {}
