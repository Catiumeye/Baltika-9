import { Field, Mutation, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { CreateUserResultType } from '../models/results/create-user-result.type';
import { GetUserResultType } from '../models/results/get-user-result.type';
import { User } from '../user.entity';

@ObjectType()
export class UserMutationType {
    @Field(() => CreateUserResultType, {
        description: 'Create User',
    })
    createUser: CreateUserResultType;

    @Field(() => User, {
        description: ''
    })
    deleteUser: User;
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
    @Mutation(() => UserMutationType)
    userMutations() {
        return {};
    }

    @Query(() => UserQueryType)
    userQueries() {
        return {};
    }
}
