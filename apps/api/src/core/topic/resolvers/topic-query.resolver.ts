import { Roles } from "@app/common/decorators/roles.decorator";
import { AuthGuard } from "@app/common/guards/auth.guard";
import { RoleGuard } from "@app/common/guards/roles.guard";
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

    @Roles('ALL')
    @UseGuards(AuthGuard, RoleGuard)
    @ResolveField(() => GetTopicResult)
    async getTopic(
        @Args('id', {type: () => ID}) id: string,
    ): Promise<GetTopicResult> {
        
        return await this.topicService.getTopic(id);
    }

}
