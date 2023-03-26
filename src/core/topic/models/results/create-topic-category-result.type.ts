import { Field, ObjectType } from "@nestjs/graphql";
import { TopicCategory } from "core/topic/topic-category.entity";


@ObjectType()
export class CreateTopicCategoryResultType {
    @Field(() => TopicCategory)
    topic_category: TopicCategory;
}