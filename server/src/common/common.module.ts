import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import databaseConfig from './database/database.config';
import firebaseAdminConfig from './firebase/firebase-admin.config';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.env.${process.env.NODE_ENV}`,
            load: [databaseConfig, firebaseAdminConfig],
        }),
        DatabaseModule,
    ],
})
export class CommonModule {}
