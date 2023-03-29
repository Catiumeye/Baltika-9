import { Field, ID, ObjectType, registerEnumType } from "@nestjs/graphql";
import { TopicCategoryStatus } from "@prisma/client";

registerEnumType(TopicCategoryStatus, {
    name: 'TopicCategoryStatus'
})


@ObjectType()
export class TopicCategory {
    @Field(() => ID)
    id: string;

    @Field(() => String)
    title: string

    @Field(() => TopicCategoryStatus)
    status: TopicCategoryStatus
}
