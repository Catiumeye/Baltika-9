import { Field, Mutation, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { CreateTopicCategoryResultType } from '../models/results/create-topic-category-result.type';
import { CreateTopicCommentResult } from '../models/results/create-topic-comment-result.type';
import { CreateTopicResultType } from '../models/results/create-topic-result.type';
import { GetTopicResult } from '../models/results/get-topic-result.type';
import { DeleteTopicResult } from '../models/results/delete-topic-result.type';
import { GetTopicsResult } from '../models/results/get-topics-result.type';


@ObjectType()
export class TopicMutationType {
    @Field(() => CreateTopicCategoryResultType)
    createTopicCategory: CreateTopicCategoryResultType;

    @Field(() => CreateTopicResultType)
    createTopic: CreateTopicResultType;

    @Field(() => CreateTopicCommentResult)
    createTopicComment: CreateTopicResultType;

    @Field(() => DeleteTopicResult)
    deleteTopic: DeleteTopicResult;
}

@ObjectType()
export class TopicQueryType {
    @Field(() => GetTopicResult)
    getTopic: GetTopicResult;

    @Field(() => GetTopicsResult)
    getTopics: GetTopicsResult;
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
