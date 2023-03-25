import { Field, ObjectType } from "@nestjs/graphql";
import { UserProfile } from "core/user-profile/user-profile.entity";




@ObjectType()
export class GetUserProfileResultType {
    @Field(() => UserProfile)
    user: UserProfile
}