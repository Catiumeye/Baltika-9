import { BaseResultType } from "@app/common/models/result/base-result.type";
import { Field, ObjectType } from "@nestjs/graphql";
import { Topic } from "../../topic.entity";


@ObjectType()
export class GetTopicResult extends BaseResultType {
    @Field(() => Topic, {
        nullable: true
    })
    topic?: Topic | null
}