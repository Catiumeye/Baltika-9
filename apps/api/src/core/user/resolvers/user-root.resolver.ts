import { Field, Mutation, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { RegisterUserResultType } from '../../auth/models/results/register-user-result.type';
import { GetUserResultType } from '../models/results/get-user-result.type';
import { GetUsersResult } from '../models/results/get-users-result.type';
import { User } from '../user.entity';
import { BanUserResult } from '../models/results/ban-user-result.type';
import { UnbanUserResult } from '../models/results/unban-user-result.type';

@ObjectType()
export class UserMutationType {
    @Field(() => User)
    delete: User;

    @Field(() => BanUserResult)
    banUser: BanUserResult;

    @Field(() => UnbanUserResult)
    unbanUser: UnbanUserResult;
}

@ObjectType()
export class UserQueryType {
    @Field(() => GetUserResultType, {
        description: 'Get User',
    })
    getUser: GetUserResultType;

    @Field(() => GetUsersResult, {
        description: 'Get Users'
    })
    getUsers: GetUsersResult
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
