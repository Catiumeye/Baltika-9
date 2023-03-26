import { Field, ID, ObjectType } from "@nestjs/graphql";
import { UserProfile } from "core/user-profile/user-profile.entity";
import { Topic } from "./topic.entity";


@ObjectType()
export class TopicMessage {
    @Field(() => ID)
    id: string;

    @Field(() => Topic)
    topic: Topic

    @Field(() => UserProfile)
    author: UserProfile

    @Field(() => String)
    message: string
}