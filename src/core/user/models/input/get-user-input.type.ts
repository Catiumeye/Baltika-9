import { ArgsType, Field, ID, InputType } from "@nestjs/graphql";



@ArgsType()
export class GetUserInputType {
    @Field(() => ID, {
        nullable: true
    })
    id?: string;

    @Field(() => String, {
        nullable: true
    })
    username?: string;
}