import { BaseResultType } from "@app/common/models/result/base-result.type";
import { Field, ObjectType } from "@nestjs/graphql";
import { TopicComment } from "../../topic-comment.entity";



@ObjectType()
export class CreateTopicCommentResult extends BaseResultType {
    @Field(() => TopicComment)
    comment: TopicComment;
}