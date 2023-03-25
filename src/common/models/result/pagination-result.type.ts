import { Field, Int, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class PaginationResultType {
    @Field(() => Int, {
        nullable: false,
        description: 'Page number',
    })
    page: number;

    @Field(() => Int, {
        nullable: false,
        description: 'Total page count',
    })
    pageCount: number;
}