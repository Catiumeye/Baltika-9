import { Field, ID, ObjectType, registerEnumType } from "@nestjs/graphql";
import { UserRole } from "@prisma/client";
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { Auth } from "../auth/auth.entity";
import { UserProfile } from "../user-profile/user-profile.entity";
import { Avatar } from "./avatar.entity";
import { File } from "./file.entity";

registerEnumType(UserRole, {
    name: 'UserRole'
})

@ValidatorConstraint({ name: 'UsernameValidator', async: false })
export class UsernameValidator implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments) { 
    const match = value.match(/^[a-z0-9]{3,30}$/i);    
    return !!match;

    
  }
  defaultMessage(args: ValidationArguments) {
    return 'incorrect username';
  }
}

@ObjectType()
export class User {
    @Field(() => ID)
    id: string;

    @Field(() => String)
    username: string

    @Field(() => String)
    email: string;

    @Field(() => UserRole)
    role: UserRole;

    @Field(() => Date)
    created_at: Date;

    @Field(() => Date)
    updated_at: Date;

    @Field(() => Auth, {
        nullable: true
    })
    auth: Auth | null;

    @Field(() => UserProfile, {
        nullable: true
    })
    userProfile?: UserProfile | null;

    @Field(() => [Avatar], {
        nullable: true
    })
    avatars?: Avatar[] | null;

    @Field(() => [File], {
        nullable: true
    })
    files?: File[] | null;
}