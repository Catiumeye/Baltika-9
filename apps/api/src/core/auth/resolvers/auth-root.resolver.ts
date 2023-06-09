import { Field, Mutation, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { LoginResultType } from '../models/results/login-result.type';
import { RegisterSocialResult } from '../models/results/register-social-result.type';
import { RegisterUserResultType } from '../models/results/register-user-result.type';


@ObjectType()
export class AuthMutationType {
    @Field(() => RegisterUserResultType, {
        description: 'Register User',
    })
    register: RegisterUserResultType;

    @Field(() => RegisterSocialResult, {
        description: 'Register User By Social',
    })
    registerSocial: RegisterSocialResult;

    // @Field(() => LoginResultType)
    // login: LoginResultType;

    @Field(() => LoginResultType)
    loginSocial: LoginResultType;

}

@ObjectType()
export class AuthQueryType {
    @Field(() => String)
    valera: string;
}

@Resolver()
export class AuthRootResolver {
    @Mutation(() => AuthMutationType)
    authMutations() {
        return {};
    }

    @Query(() => AuthQueryType)
    authQueries() {
        return {};
    }
}
