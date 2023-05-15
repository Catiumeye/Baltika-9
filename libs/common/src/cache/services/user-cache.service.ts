import { InjectRedis, Redis } from "@nestjs-modules/ioredis";
import { Injectable } from "@nestjs/common";
import { BaseCacheService } from "./base-cache.service";
import { CacheType } from "@app/common/types/cache.type";



@Injectable()
export class UserCacheService extends BaseCacheService<'user'> {
    constructor(
        // @ts-ignore
        @InjectRedis() protected readonly redis: Redis,

    ) {
        super(redis, 'user');
    }


}