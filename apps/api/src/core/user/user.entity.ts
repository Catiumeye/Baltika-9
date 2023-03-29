import { Field, ID, ObjectType } from "@nestjs/graphql";
import { UserProfile } from "../user-profile/user-profile.entity";


@ObjectType()
export class User {
    @Field(() => ID)
    id: string;

    @Field(() => String)
    username: string

    @Field(() => String)
    email: string;

    @Field(() => Date)
    created_at: Date;

    @Field(() => Date)
    updated_at: Date;

    @Field(() => UserProfile, {
        nullable: true
    })
    userProfile?: UserProfile
}