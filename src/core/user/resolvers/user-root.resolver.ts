import { Field, Mutation, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { CreateUserResultType } from '../results/create-user-result.type';
import { GetUserResultType } from '../results/get-user-result.type';

@ObjectType()
export class UserMutationType {
    @Field(() => CreateUserResultType, {
        description: 'Create User',
    })
    createUserCollection: CreateUserResultType;
}

@ObjectType()
export class UserQueryType {
    @Field(() => GetUserResultType, {
        description: 'Get User',
    })
    getUser: GetUserResultType;
}

@Resolver()
export class UserRootResolver {
    @Mutation(() => UserMutationType, {
        description: 'User Collection mutations',
    })
    userMutations() {
        return {};
    }

    @Query(() => UserQueryType, {
        description: 'User Collection queries',
    })
    userQueries() {
        return {};
    }
}
