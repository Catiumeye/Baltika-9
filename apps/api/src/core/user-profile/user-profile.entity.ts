import { Field, ID, ObjectType } from "@nestjs/graphql";
import { TopicComment } from "../topic/topic-comment.entity";
import { Topic } from "../topic/topic.entity";
import { Avatar } from "../user/avatar.entity";
import { User } from "../user/user.entity";


@ObjectType()
export class UserProfile {
    @Field(() => User, {
        description: 'Private Data'
    })
    user?: User;

    @Field(() => ID)
    user_id?: string;
    
    @Field(() => String, {
        nullable: true
    })
    bio?: string | null;

    @Field(() => Date)
    last_active?: Date;

    @Field(() => [Topic])
    topics?: Topic[];

    @Field(() => [TopicComment])
    topic_comments?: TopicComment[];

    @Field(() => [Avatar], {
        nullable: true
    })
    avatars?: Avatar[];
}