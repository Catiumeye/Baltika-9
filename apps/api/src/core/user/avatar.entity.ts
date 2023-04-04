import { Field, ID, ObjectType } from "@nestjs/graphql";
import { File } from "./file.entity";
import { User } from "./user.entity";



@ObjectType()
export class Avatar {
    @Field(() => ID)
    id: string;

    @Field(() => ID)
    user_id: string;

    @Field(() => User)
    user?: User | null;

    @Field(() => String, {
        nullable: true
    })
    file_id?: string | null;
    
    @Field(() => String, {
        nullable: true
    })
    url?: string | null;

    @Field(() => File, {
        nullable: true
    })
    file?: File | null;
}