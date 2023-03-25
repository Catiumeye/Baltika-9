import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "core/user/user.entity";


@ObjectType()
export class UserProfile {
    @Field(() => User, {
        description: 'Private Data'
    })
    user: User;
}