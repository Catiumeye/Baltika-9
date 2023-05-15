import { Field, ObjectType } from "@nestjs/graphql";
import { BaseResultType } from "@app/common/models/result/base-result.type";


@ObjectType()
export class DeleteTopicResult extends BaseResultType {
    @Field(() => Boolean)
    ok: boolean;
}