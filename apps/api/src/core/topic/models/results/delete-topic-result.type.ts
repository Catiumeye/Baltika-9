import { Field, ObjectType } from "@nestjs/graphql";
import { Topic } from "../../topic.entity";
import { BaseResultType } from "@app/common/models/result/base-result.type";


@ObjectType()
export class DeleteTopicResult extends BaseResultType {
    @Field(() => Topic, {
        nullable: true
    })
    topic?: Topic;
}