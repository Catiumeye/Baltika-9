import { ArgsType, Field } from "@nestjs/graphql";
import { TopicCategoryStatus } from "@prisma/client";
import { IsOptional, Length } from "class-validator";


@ArgsType()
export class CreateTopicCategoryInputType {
    @Length(2)
    @Field(() => String)
    title: string;

    @IsOptional()
    @Field(() => TopicCategoryStatus, {
        nullable: true,
        description: 'Default HIDDEN'
    })
    status: TopicCategoryStatus;
}