import { ArgsType, Field } from "@nestjs/graphql";
import { AuthType } from "@prisma/client";
import { IsOptional, Validate } from "class-validator";
import { AuthSocialType, ExcludeJwtValidator } from "../../auth.entity";



@ArgsType()
export class LoginSocialInput {
    @Validate(ExcludeJwtValidator)
    @Field(() => AuthType, {
        description: 'Acceptable all except JWT'
    })
    auth_type: AuthSocialType;

    @IsOptional()
    @Field(() => String, {
        nullable: true,
        description: 'Verification code from OAuth'
    })
    code?: string
}