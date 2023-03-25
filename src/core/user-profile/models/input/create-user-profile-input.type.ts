import { ArgsType, Field, ID } from "@nestjs/graphql";


@ArgsType()
export class CreateUserProfileInputType {
    @Field(() => ID)
    valera: number;
}