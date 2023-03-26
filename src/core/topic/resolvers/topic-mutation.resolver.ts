import { TopicService } from '../services/topic.service';
import { Args, Int, ResolveField, Resolver } from '@nestjs/graphql';
import { TopicMutationType, TopicRootResolver } from './topic-root.resolver';
import { CreateTopicCategoryInputType } from '../models/input/create-topic-category-input.type';
import { CreateTopicCategoryResultType } from '../models/results/create-topic-category-result.type';
import { CreateTopicResultType } from '../models/results/create-topic-result.type';
import { CreateTopicInputType } from '../models/input/create-topic-input.type';

@Resolver(TopicMutationType)
export class TopicMutationResolver extends TopicRootResolver {
    constructor(private topicService: TopicService) {
        super();
    }

    @ResolveField(() => CreateTopicCategoryResultType)
    async createTopicCategory(
        @Args() input: CreateTopicCategoryInputType
    ): Promise<CreateTopicCategoryResultType> {
        return await this.topicService.createTopicCategory(input);
    }

    @ResolveField(() => CreateTopicResultType)
    async createTopic(
        @Args() input: CreateTopicInputType
    ): Promise<CreateTopicResultType> {
        return await this.topicService.createTopic(input);
    }
}
