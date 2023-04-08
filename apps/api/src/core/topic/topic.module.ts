import { Module } from "@nestjs/common";
import { AuthModule } from "../auth/auth.module";
import { TopicMutationResolver } from "./resolvers/topic-mutation.resolver";
import { TopicQueryResolver } from "./resolvers/topic-query.resolver";
import { TopicRootResolver } from "./resolvers/topic-root.resolver";
import { TopicService } from "./services/topic.service";


@Module({
    imports: [AuthModule],
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