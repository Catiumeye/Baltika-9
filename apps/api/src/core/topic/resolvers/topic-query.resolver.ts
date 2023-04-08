import { UserData } from "@app/common/decorators/user-data.decorator";
import { AuthGuard } from "@app/common/guards/auth.guard";
import { UseGuards } from "@nestjs/common";
import { Args, ID, Int, ResolveField, Resolver } from "@nestjs/graphql";
import { GetTopicResult } from "../models/results/get-topic-result.type";
import { TopicService } from "../services/topic.service";
import { TopicQueryType, TopicRootResolver } from "./topic-root.resolver";

@Resolver(TopicQueryType)
export class TopicQueryResolver extends TopicRootResolver {
    constructor(private topicService: TopicService) {
        super();
    }

    @UseGuards(AuthGuard)
    @ResolveField(() => Int, {})
    async getTopic(
        @UserData() user: any,
        @Args('id', {type: () => ID}) id: string
    ): Promise<GetTopicResult> {
        console.log('SSS', user);
        
        return await this.topicService.getTopic(id);
    }

}
