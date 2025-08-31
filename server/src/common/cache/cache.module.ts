import { createKeyv } from '@keyv/redis';
import { CacheModule as AppCacheModule } from '@nestjs/cache-manager';
import { DynamicModule } from '@nestjs/common';

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
