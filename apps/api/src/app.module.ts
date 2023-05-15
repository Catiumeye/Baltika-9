import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import {  Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { CommonModule } from '@app/common/common.module';
import { CoreModule } from './core/core.module';
import { RedisModule } from '@nestjs-modules/ioredis';
import { CacheModule } from '@app/common/cache/cache.module';


// @Global()
@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        RedisModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
              config: {
                url: configService.getOrThrow('REDIS_URL')
              }
            })
          }),
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: true,
            fieldResolverEnhancers: ['guards', 'interceptors'],
            sortSchema: true,
        }),
        CommonModule,
        CoreModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
