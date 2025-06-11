import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import databaseConfig from './database/database.config';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.env.${process.env.NODE_ENV}`,
            load: [databaseConfig],
        }),
        DatabaseModule,
    ],
})
export class CommonModule {}
