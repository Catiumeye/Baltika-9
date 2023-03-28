import { ArgsType, Field, ID, InputType } from "@nestjs/graphql";
import { IsOptional, IsString, IsUUID } from "class-validator";



@ArgsType()
export class GetUserInputType {
    @IsOptional()
    @IsUUID()
    @Field(() => ID, {
        nullable: true
    })
    id?: string;

    @IsOptional()
    @Field(() => String, {
        nullable: true
    })
    username?: string;
}