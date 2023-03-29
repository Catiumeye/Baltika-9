import { Field, ObjectType } from "@nestjs/graphql";
import { Topic } from "../../topic.entity";



@ObjectType()
export class CreateTopicResultType {
    @Field(() => Topic)
    topic: Topic;
}