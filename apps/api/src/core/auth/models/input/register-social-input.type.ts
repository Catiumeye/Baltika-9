import { ArgsType, Field, InputType} from "@nestjs/graphql";
import { IsOptional, Validate, ValidateNested, ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { AuthType } from "@prisma/client";
import { Transform, Type } from 'class-transformer'

@ValidatorConstraint({ name: 'ExcludeJwtValidator', async: false })
class ExcludeJwtValidator implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments) {
    return value !== 'JWT';
  }
  defaultMessage(args: ValidationArguments) {
    return 'Unacceptable value JWT for AuthSocial';
  }
}

@ValidatorConstraint({ name: 'UsernameValidator', async: false })
class UsernameValidator implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments) { 
    const match = value.match(/^[a-z0-9]{3,30}$/i);    
    return !!match;

    
  }
  defaultMessage(args: ValidationArguments) {
    return 'incorrect username';
  }
}

@InputType()
class UserData {
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
    auth_type: AuthType;

    @ValidateNested()
    @Type(() => UserData)
    @Field(() => UserData, {
        nullable: true
    })
    user_data: UserData;
}


