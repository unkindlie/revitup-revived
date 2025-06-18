import { DynamicModule } from '@nestjs/common';
import { CacheModule as AppCacheModule } from '@nestjs/cache-manager';
import { createKeyv } from '@keyv/redis';

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
        };
    }
}
