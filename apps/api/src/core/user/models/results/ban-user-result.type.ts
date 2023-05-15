import { BaseResultType } from "@app/common/models/result/base-result.type";
import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "../../user.entity";



@ObjectType()
export class BanUserResult extends BaseResultType {
    @Field(() => User, {
        nullable: true
    })
    user: User;
}