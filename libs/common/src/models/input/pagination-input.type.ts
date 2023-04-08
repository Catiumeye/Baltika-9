import { ArgsType, Field, Int } from "@nestjs/graphql";
import { IsInt } from "class-validator";



@ArgsType()
export class PaginationInput {
    @IsInt()
    @Field(() => Int, {
        description: 'Page number'
    })
    page: number

    @IsInt()
    @Field(() => Int, {
        description: 'Count per page'
    })
    perPage: number; 
}