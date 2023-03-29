import { Field, ID, ObjectType } from "@nestjs/graphql";
import { BaseResultType } from "@app/common/models/result/base-result.type";
import { User } from "../../../user/user.entity";



@ObjectType()
export class RegisterUserResultType extends BaseResultType {
    @Field(() => Boolean)
    ok: boolean;
}