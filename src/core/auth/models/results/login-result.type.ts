import { Field, ObjectType } from "@nestjs/graphql";
import { BaseResultType } from "common/models/result/base-result.type";



@ObjectType()
export class LoginResultType extends BaseResultType {
    @Field(() => String, {
        nullable: true
    })
    access_token?: string;

    @Field(() => String, {
        nullable: true
    })
    refresh_token?: string;
}