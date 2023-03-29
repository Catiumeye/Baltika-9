import { Field, Mutation, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { CreateTopicCategoryResultType } from '../models/results/create-topic-category-result.type';
import { CreateTopicResultType } from '../models/results/create-topic-result.type';


@ObjectType()
export class TopicMutationType {
    @Field(() => CreateTopicCategoryResultType)
    createTopicCategory: CreateTopicCategoryResultType;

    @Field(() => CreateTopicResultType)
    createTopic: CreateTopicResultType;
}

@ObjectType()
export class TopicQueryType {

}

@Resolver()
export class TopicRootResolver {
    @Mutation(() => TopicMutationType)
    topicMutations() {
        return {};
    }

    @Query(() => TopicQueryType)
    topicQueries() {
        return {};
    }
}
