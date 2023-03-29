import { ArgsType, Field, Int } from "@nestjs/graphql";



@ArgsType()
export class PaginationInputType {
    @Field(() => Int, {
        description: 'Page number'
    })
    page: number

    @Field(() => Int, {
        description: 'Count per page'
    })
    perPage: number; 
}