import { ArgsType, Field, ID } from "@nestjs/graphql";
import { IsNotEmpty, IsOptional, IsUUID } from "class-validator";


@ArgsType()
export class CreateTopicCommentInput {
    @IsUUID()
    @Field(() => ID)
    topic_id: string;

    @IsUUID()
    @Field(() => ID)
    author_id: string;

    @IsUUID()
    @IsOptional()
    @Field(() => ID, {
        nullable: true,
    })
    parent_id?: string;

    @IsNotEmpty()
    @Field(() => String)
    message: string;
}