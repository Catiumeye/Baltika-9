import { ArgsType, Field } from "@nestjs/graphql";
import { TopicCategoryStatus } from "@prisma/client";


@ArgsType()
export class CreateTopicCategoryInputType {
    @Field(() => String, {

    })
    title: string;

    @Field(() => TopicCategoryStatus, {
        
    })
    status: TopicCategoryStatus;
}