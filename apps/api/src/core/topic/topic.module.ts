import { Module } from "@nestjs/common";
import { TopicMutationResolver } from "./resolvers/topic-mutation.resolver";
import { TopicQueryResolver } from "./resolvers/topic-query.resolver";
import { TopicRootResolver } from "./resolvers/topic-root.resolver";
import { TopicService } from "./services/topic.service";


@Module({
    imports: [],
    controllers: [],
    providers: [
        TopicRootResolver,
        TopicMutationResolver,
        TopicQueryResolver,
        TopicService
    ],
    exports: []
})
export class TopicModule {

}