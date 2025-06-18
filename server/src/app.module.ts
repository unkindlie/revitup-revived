import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { FeaturesModule } from './features/features.module';
import { DatabaseModule } from './common/database/database.module';
import databaseConfig from './common/database/database.config';
import firebaseAdminConfig from './common/firebase/firebase-admin.config';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.env.${process.env.NODE_ENV}`,
            load: [databaseConfig, firebaseAdminConfig],
        }),
        DatabaseModule,
        FeaturesModule,
    ],
})
export class AppModule {}
