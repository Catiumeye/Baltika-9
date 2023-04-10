import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Auth } from "./auth.entity";

@ObjectType()
class SessionMetadataOS {
    @Field(() => String, {
        nullable: true
    })
    name?: string;

    @Field(() => String, {
        nullable: true
    })
    version?: string;
}

@ObjectType()
class SessionMetadataBrowser {
    @Field(() => String, {
        nullable: true
    })
    name?: string;

    @Field(() => String, {
        nullable: true
    })
    major?: string;
}

@ObjectType()
class SessionMetadataDevice {
    @Field(() => String, {
        nullable: true
    })
    vendor?: string;

    @Field(() => String, {
        nullable: true
    })
    model?: string;

    @Field(() => String, {
        nullable: true
    })
    type?: string;
}

@ObjectType()
class SessionMetadataCPU {
    @Field(() => String, {
        nullable: true
    })
    architecture?: string;
}

@ObjectType()
export class SessionMetadata {
    @Field(() => SessionMetadataOS)
    os: SessionMetadataOS;

    @Field(() => SessionMetadataBrowser)
    browser: SessionMetadataBrowser;

    @Field(() => SessionMetadataDevice)
    device: SessionMetadataDevice;

    @Field(() => SessionMetadataCPU)
    cpu: SessionMetadataCPU;
}

@ObjectType()
export class Session {
    @Field(() => ID)
    id: string;

    @Field(() => String)
    ip: string;

    @Field(() => ID)
    user_id: string;
    
    @Field(() => Boolean)
    is_used: boolean;
    
    @Field(() => SessionMetadata)
    metadata: SessionMetadata;

    @Field(() => String)
    refresh_token: string;
}