import { ArgsType, Field, ID, InputType } from "@nestjs/graphql";
import { IsString, Length } from "class-validator";



@ArgsType()
export class CreateUserInputType {
    @Length(3, 32)
    @Field(() => String)
    username: string;

    @Field(() => String)
    email: string;

    @Field(() => String)
    password: string;
}