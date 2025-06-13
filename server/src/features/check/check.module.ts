import { Module } from '@nestjs/common';

import { FirebaseModule } from '../../common/firebase/firebase.module';
import { CheckController } from './check.controller';

@Module({
    imports: [FirebaseModule],
    controllers: [CheckController],
})
export class CheckModule {}
