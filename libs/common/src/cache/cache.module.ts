import { RedisModule } from "@nestjs-modules/ioredis";
import { Global, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { BaseCacheService } from "./services/base-cache.service";
import { UserCacheService } from "./services/user-cache.service";


@Global()
@Module({
    imports: [],
    controllers: [],
    providers: [UserCacheService],
    exports: [UserCacheService]
})
export class CacheModule {}