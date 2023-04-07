import { ArgsType, Field, ID } from "@nestjs/graphql";
import { TopicStatus } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsUUID, Length } from "class-validator";


@ArgsType()
export class CreateTopicInputType {
    @IsUUID()
    @Field(() => String)
    category_id: string;
    
    @IsEnum(TopicStatus)
    @Field(() => TopicStatus, {
        defaultValue: TopicStatus.VISIBLE
    })
    status: TopicStatus;
    
    @IsUUID()
    @Field(() => ID)
    author_id: string;

    @Length(2, 120)
    @Field(() => String, {
        description: 'Title from 10 to 120 chars'
    })
    title: string;

    @IsNotEmpty()
    @Field(() => String)
    content: string;
}
