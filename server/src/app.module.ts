import { APP_INTERCEPTOR } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { FeaturesModule } from './features/features.module';
import { DatabaseModule } from './common/database/database.module';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import databaseConfig from './common/database/database.config';
import firebaseAdminConfig from './common/firebase/firebase-admin.config';
import authConfig from './features/auth/auth.config';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.env.${process.env.NODE_ENV}`,
            load: [databaseConfig, firebaseAdminConfig, authConfig],
        }),
        DatabaseModule,
        FeaturesModule,
    ],
    providers: [
        {
            provide: APP_INTERCEPTOR,
            useClass: ResponseInterceptor,
        },
    ],
})
export class AppModule {}
