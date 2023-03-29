import { Field, Mutation, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { LoginResultType } from '../models/results/login-result.type';
import { RegisterUserResultType } from '../models/results/register-user-result.type';


@ObjectType()
export class AuthMutationType {
    @Field(() => RegisterUserResultType, {
        description: 'Register User',
    })
    register: RegisterUserResultType;
}

@ObjectType()
export class AuthQueryType {
    @Field(() => LoginResultType)
    login: LoginResultType
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
