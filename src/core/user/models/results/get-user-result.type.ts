import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "../../user.entity";



@ObjectType()
export class GetUserResultType {
    @Field(() => User)
    user: User;
}