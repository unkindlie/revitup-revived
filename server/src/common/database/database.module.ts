import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import databaseConfig from './database.config';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule.forFeature(databaseConfig)],
            useFactory: (config: ConfigType<typeof databaseConfig>) => ({
                type: 'postgres',
                host: 'localhost',
                port: parseInt(config.port!),
                username: config.username,
                password: config.password,
                database: config.database,
                synchronize: true,
                entities: [__dirname + '/../../features/**/**.entity.{ts,js}'],
            }),
            inject: [databaseConfig.KEY],
        }),
    ],
})
export class DatabaseModule {}
