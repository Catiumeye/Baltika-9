import { Field, ID, ObjectType, registerEnumType } from "@nestjs/graphql";
import { AuthType } from "@prisma/client";
import { User } from "../user/user.entity";
import { AuthSession } from "./auth-session.entity";

registerEnumType(AuthType, {
    name: 'AuthType'
})

@ObjectType()
export class Auth {
    @Field(() => AuthType)
    type: AuthType;

    @Field(() => ID)
    user_id: string;

    @Field(() => User, {
        nullable: true
    })
    user?: User | null;

    @Field(() => ID)
    external_id: string;

    @Field(() => [AuthSession], {
        nullable: true
    })
    sessions?: AuthSession[];
}