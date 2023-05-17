import { CacheType } from "@app/common/types/cache.type";
import { InjectRedis, Redis } from "@nestjs-modules/ioredis";
import { Injectable } from "@nestjs/common";


@Injectable()
export abstract class BaseCacheService<T extends CacheType> {
    constructor(
        // @ts-ignore
        @InjectRedis() protected readonly redis: Redis,
        protected entity: T,
    ) {}
    
    // async fi4a() {
    //     await this.redis.rpush('board:todo:ids', 'конец')
    //     await this.redis.lpush('board:todo:ids', 'начало')
    //     console.log(await this.redis.lrange('board:todo:ids', 0, -1));
    // }

    async get<GET>(id: string): Promise<GET | null> {
        const result = await this.redis.get(`${this.entity}:${id}`);
        return result ? JSON.parse(result) : result;
    }

    async set(id: string, data: object) {
        return await this.redis.set(`${this.entity}:${id}`, JSON.stringify(data), 'EX', 86400);
    }

    async delete(id: string) {
        return await this.redis.del(`${this.entity}:${id}`);
    }
}