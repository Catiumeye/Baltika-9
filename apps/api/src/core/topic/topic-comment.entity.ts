import { Field, ID, ObjectType } from "@nestjs/graphql";
import { UserProfile } from "../user-profile/user-profile.entity";
import { Topic } from "./topic.entity";


@ObjectType()
export class TopicComment {
    @Field(() => ID)
    id?: string;

    @Field(() => ID)
    topic_id?: string;

    @Field(() => ID)
    author_id?: string;

    @Field(() => ID, {
        nullable: true
    })
    parent_id?: string | null;

    @Field(() => String)
    message?: string;
    
    @Field(() => UserProfile, {
        nullable: true
    })
    author?: UserProfile;

    @Field(() => Topic)
    topic?: Topic;

    @Field(() => TopicComment, {
        nullable: true
    })
    parrent?: TopicComment;

    @Field(() => [TopicComment], {
        nullable: true
    })
    children?: TopicComment[];
}