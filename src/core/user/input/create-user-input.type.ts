import { Field, InputType } from "@nestjs/graphql";



@InputType()
export class CreateUserInputType {
    @Field(() => String)
    username: string;
}