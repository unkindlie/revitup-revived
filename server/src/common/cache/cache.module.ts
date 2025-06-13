import { DynamicModule } from '@nestjs/common';
import { CacheModule as AppCacheModule } from '@nestjs/cache-manager';
import { createKeyv } from '@keyv/redis';

import { CacheService } from './cache.service';

export class CacheModule {
    static register(): DynamicModule {
        return {
            module: CacheModule,
            imports: [
                AppCacheModule.registerAsync({
                    useFactory: () => ({
                        stores: [createKeyv('redis://localhost:6379')],
                    }),
                    isGlobal: true,
                }),
            ],
            providers: [CacheService],
            exports: [CacheService],
        };
    }
}
