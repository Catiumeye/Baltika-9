import { ArgsType, Field } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsUUID, ValidateIf } from "class-validator";



@ArgsType()
export class BaseUserInput {
    @ValidateIf((obj: BaseUserInput, value?: string) => !obj.email && !obj.username)
    @IsUUID()
    @Field(() => String, {
        nullable: true
    })
    id?: string;

    @ValidateIf((obj: BaseUserInput, value?: string) => !obj.username && !obj.id)
    @IsEmail()
    @Field(() => String, {
        nullable: true
    })
    email?: string;

    @ValidateIf((obj: BaseUserInput, value?: string) => !obj.email && !obj.id)
    @IsNotEmpty()
    @Field(() => String, {
        nullable: true
    })
    username?: string;
}