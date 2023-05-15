import { Field, ObjectType } from "@nestjs/graphql";
import { Topic } from "../../topic.entity";
import { BaseResultType } from "@app/common/models/result/base-result.type";



@ObjectType()
export class GetTopicsResult extends BaseResultType {
    @Field(() => [Topic], {
        nullable: true,
    })
    topics?: Topic[];
}