import { Args, ID, Int, ResolveField, Resolver } from "@nestjs/graphql";
import { GetTopicResult } from "../models/results/get-topic-result.type";
import { TopicService } from "../services/topic.service";
import { TopicQueryType, TopicRootResolver } from "./topic-root.resolver";

@Resolver(TopicQueryType)
export class TopicQueryResolver extends TopicRootResolver {
    constructor(private topicService: TopicService) {
        super();
    }

    @ResolveField(() => Int, {})
    async getTopic(
        @Args('id', {type: () => ID}) id: string
    ): Promise<GetTopicResult> {
        
        return await this.topicService.getTopic(id);
    }

}
