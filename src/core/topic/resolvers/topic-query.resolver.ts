import { Args, Int, ResolveField, Resolver } from "@nestjs/graphql";
import { TopicService } from "../services/topic.service";
import { TopicQueryType, TopicRootResolver } from "./topic-root.resolver";

@Resolver(TopicQueryType)
export class TopicQueryResolver extends TopicRootResolver {
    constructor(private topicService: TopicService) {
        super();
    }

    @ResolveField(() => Int, {})
    async getUser(

    ): Promise<any> {
        
        return await this.topicService;
    }

}
