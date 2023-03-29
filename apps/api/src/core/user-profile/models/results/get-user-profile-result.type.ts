import { Field, ObjectType } from "@nestjs/graphql";
import { UserProfile } from "../../user-profile.entity";




@ObjectType()
export class GetUserProfileResultType {
    @Field(() => UserProfile)
    user: UserProfile
}