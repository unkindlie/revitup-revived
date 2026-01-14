import KeyvValkey from '@keyv/valkey';
import { CacheModule as AppCacheModule } from '@nestjs/cache-manager';
import { DynamicModule } from '@nestjs/common';

export class CacheModule {
  static register(): DynamicModule {
    return {
      module: CacheModule,
      imports: [
        AppCacheModule.registerAsync({
          useFactory: () => ({
            stores: [new KeyvValkey('redis://localhost:6379')],
          }),
          isGlobal: true,
        }),
      ],
    };
  }
}
