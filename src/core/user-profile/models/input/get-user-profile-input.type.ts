import { ArgsType, Field, ID, InputType } from "@nestjs/graphql";



@ArgsType()
export class GetUserProfileInputType {
    @Field(() => ID)
    id: string;
}