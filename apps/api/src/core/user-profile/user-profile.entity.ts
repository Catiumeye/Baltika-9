import { Field, ID, ObjectType } from "@nestjs/graphql";
import { User } from "../user/user.entity";


@ObjectType()
export class UserProfile {
    @Field(() => ID)
    id: string;

    @Field(() => User, {
        description: 'Private Data'
    })
    user?: User;
    
    @Field(() => String, {
        nullable: true
    })
    bio?: string | null;
}