import { ArgsType, Field, InputType} from "@nestjs/graphql";
import { IsOptional, Validate, ValidateIf, ValidateNested } from "class-validator";
import { AuthType } from "@prisma/client";
import { Transform, Type } from 'class-transformer'
import { AuthSocialType, ExcludeJwtValidator } from "../../auth.entity";
import { UsernameValidator } from "../../../user/user.entity";

@InputType()
class UserDataInput {
    @Validate(UsernameValidator)
    @Field(() => String, {
        description: 'Unique identifier'
    })
    username: string;

    @IsOptional()
    @Field(() => Boolean, {
        nullable: true,
        defaultValue: true
    })
    include_avatar: boolean;
}

@ArgsType()
export class RegisterSocialInput {
    @IsOptional()
    @Transform(({value}) => decodeURIComponent(value))
    @Field(() => String, {
        description: 'Verification code from OAuth',
        nullable: true
    })
    code?: string;

    @Validate(ExcludeJwtValidator)
    @Field(() => AuthType, {
        description: 'Acceptable all except JWT'
    })
    auth_type: AuthSocialType;

    @ValidateNested()
    @ValidateIf((obj: RegisterSocialInput, val) => !!obj.code)
    @Type(() => UserDataInput)
    @Field(() => UserDataInput, {
        nullable: true
    })
    user_data: UserDataInput;
}


