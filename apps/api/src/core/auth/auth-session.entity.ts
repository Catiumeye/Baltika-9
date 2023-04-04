import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Auth } from "./auth.entity";



@ObjectType()
export class AuthSession {
    @Field(() => ID)
    id: string;

    @Field(() => ID)
    auth_id: string;

    @Field(() => Auth)
    auth: Auth;

    @Field(() => Date)
    expired_at: Date;

    @Field(() => String)
    user_agent: string;

    @Field(() => String)
    ip: string;

    @Field(() => String)
    refresh_token: string;
}