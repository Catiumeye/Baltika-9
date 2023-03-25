import { Field, ObjectType } from "@nestjs/graphql";



@ObjectType()
export class CreateUserProfileResultType {
    @Field(() => Boolean)
    ok: boolean;
}