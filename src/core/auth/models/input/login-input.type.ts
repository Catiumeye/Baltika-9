import { ArgsType, Field } from "@nestjs/graphql";
import { IsNotEmpty, Length } from "class-validator";

@ArgsType()
export class LoginInputType {

    @Length(3)
    @Field(() => String)
    username_or_email: string;

    @IsNotEmpty()
    @Field(() => String)
    password: string;
}