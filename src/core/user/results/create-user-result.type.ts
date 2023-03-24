import { Field, ID, ObjectType } from "@nestjs/graphql";
import { User } from "../user.entity";



@ObjectType()
export class CreateUserResultType {
    @Field(() => User)
    user: User;
}