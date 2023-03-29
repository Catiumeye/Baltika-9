import { Field, Int, ObjectType } from "@nestjs/graphql";


@ObjectType()
export class BaseResultType {
    @Field(() => Int, {
        description: 'Error code',
        nullable: true
    })
    code?: number;

    @Field(() => String, {
        description: 'Error description',
        nullable: true
    })
    message?: string;
}