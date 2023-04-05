import { Field, ID, ObjectType, registerEnumType } from "@nestjs/graphql";
import { AuthType } from "@prisma/client";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { User } from "../user/user.entity";
import { AuthSession } from "./auth-session.entity";

registerEnumType(AuthType, {
    name: 'AuthType'
})

export type AuthSocialType = Exclude<keyof typeof AuthType, 'JWT'>;

@ValidatorConstraint({ name: 'ExcludeJwtValidator', async: false })
export class ExcludeJwtValidator implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments) {
    return value !== 'JWT';
  }
  defaultMessage(args: ValidationArguments) {
    return 'Unacceptable value JWT for AuthSocial';
  }
}

@ObjectType()
export class Auth {
    @Field(() => AuthType)
    type: AuthType;

    @Field(() => ID)
    user_id: string;

    @Field(() => User, {
        nullable: true
    })
    user?: User | null;

    @Field(() => ID)
    external_id: string;

    @Field(() => [AuthSession], {
        nullable: true
    })
    sessions?: AuthSession[];
}