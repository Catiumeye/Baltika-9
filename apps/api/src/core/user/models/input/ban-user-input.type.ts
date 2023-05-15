import { ArgsType, Field } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsUUID, ValidateIf } from "class-validator";



@ArgsType()
export class BanUserInput {
    @ValidateIf((obj: BanUserInput, value?: string) => !obj.email && !obj.username)
    @IsUUID()
    @Field(() => String, {
        nullable: true
    })
    id?: string;

    @ValidateIf((obj: BanUserInput, value?: string) => !obj.username && !obj.id)
    @IsEmail()
    @Field(() => String, {
        nullable: true
    })
    email?: string;

    @ValidateIf((obj: BanUserInput, value?: string) => !obj.email && !obj.id)
    @IsNotEmpty()
    @Field(() => String, {
        nullable: true
    })
    username?: string;
}