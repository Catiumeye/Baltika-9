import { ArgsType, Field, ID, InputType } from "@nestjs/graphql";
import { IsEmail, IsString, Length } from "class-validator";



@ArgsType()
export class RegisterUserInputType {
    @Length(3, 32)
    @Field(() => String)
    username: string;

    @IsEmail()
    @Field(() => String)
    email: string;

    @Length(6)
    @Field(() => String)
    password: string;
}