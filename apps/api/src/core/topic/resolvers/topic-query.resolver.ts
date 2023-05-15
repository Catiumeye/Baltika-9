import { Roles } from "@app/common/decorators/roles.decorator";
import { AuthGuard } from "@app/common/guards/auth.guard";
import { RoleGuard } from "@app/common/guards/roles.guard";
import { UseGuards } from "@nestjs/common";
import { Args, ID, Int, ResolveField, Resolver } from "@nestjs/graphql";
import { GetTopicResult } from "../models/results/get-topic-result.type";
import { TopicService } from "../services/topic.service";
import { TopicQueryType, TopicRootResolver } from "./topic-root.resolver";
import { GetTopicsResult } from "../models/results/get-topics-result.type";
import { PaginationInput } from "@app/common/models/input/pagination-input.type";

@Resolver(TopicQueryType)
export class TopicQueryResolver extends TopicRootResolver {
    constructor(private topicService: TopicService) {
        super();
    }


    @ResolveField(() => GetTopicResult)
    async getTopic(
        @Args('id', {type: () => ID}) id: string,
    ): Promise<GetTopicResult> {
        
        return await this.topicService.getTopic(id);
    }

    @ResolveField(() => GetTopicsResult)
    async getTopics(
        @Args() pagionation: PaginationInput
    ) {
        return await this.topicService
    }
}
