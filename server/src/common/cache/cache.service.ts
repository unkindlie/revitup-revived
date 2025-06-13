import { Cache } from '@nestjs/cache-manager';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CacheService {
    constructor(private cache: Cache) {}
}
