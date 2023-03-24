import { Field, ID, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class User {
    @Field(() => ID)
    id: string;

    @Field(() => String)
    email: string;

    @Field(() => String)
    password: string;

    @Field(() => Date)
    created_at: Date;

    @Field(() => Date)
    updated_at: Date;
}