import { Field, ID, ObjectType } from "@nestjs/graphql";
import { User } from "./user.entity";



@ObjectType()
export class File {
    @Field(() => ID)
    id: string;

    @Field(() => ID)
    user_id: string;

    @Field(() => String)
    file_id: string;
    
    @Field(() => String)
    bucket: string;

    @Field(() => String)
    url: string;

    @Field(() => User, {
        nullable: true
    })
    user?: User | null;

    @Field(() => Date)
    created_at: Date;
}