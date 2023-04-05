import { BaseResultType } from "@app/common/models/result/base-result.type";
import { Field, ObjectType } from "@nestjs/graphql";



@ObjectType()
export class LoginSocialResult extends BaseResultType {
    @Field(() => String, {
        nullable: true
    })
    access_token?: string;

    @Field(() => String, {
        nullable: true
    })
    refresh_token?: string;
}