import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { CommonModule } from './common/common.module';
import { CoreModule } from './core/core.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
        driver: ApolloDriver,
        autoSchemaFile: true,
        // sortSchema: true,
    }),
    CommonModule,
    CoreModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
