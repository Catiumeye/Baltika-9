import { Field, ID, ObjectType, registerEnumType } from "@nestjs/graphql";
import { TopicStatus } from "@prisma/client";
import { UserProfile } from "../user-profile/user-profile.entity";
import { TopicCategory } from "./topic-category.entity";
import { TopicComment } from "./topic-comment.entity";

registerEnumType(TopicStatus, {
    name: 'TopicStatus'
})


@ObjectType()
export class Topic {
    @Field(() => ID)
    id: string;

    @Field(() => TopicStatus)
    status: TopicStatus;
    
    @Field(() => UserProfile)
    author?: UserProfile;
    
    @Field(() => String)
    title: string;
    
    @Field(() => String)
    content?: string;

    @Field(() => TopicCategory)
    category?: TopicCategory;

    @Field(() => [TopicComment])
    comments?: TopicComment[];
}
