import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import {  Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { CommonModule } from '@app/common/common.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
        driver: ApolloDriver,
        autoSchemaFile: true,
        fieldResolverEnhancers: ['guards', 'interceptors'],
        sortSchema: true,
        context: (a: any) => ({headers: a.req.headers})
    }),
    CommonModule,
    CoreModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
