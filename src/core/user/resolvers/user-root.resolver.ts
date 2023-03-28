import { Field, Mutation, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { RegisterUserResultType } from '../../auth/models/results/register-user-result.type';
import { GetUserResultType } from '../models/results/get-user-result.type';
import { User } from '../user.entity';

@ObjectType()
export class UserMutationType {
    @Field(() => User, {
        description: ''
    })
    delete: User;
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
