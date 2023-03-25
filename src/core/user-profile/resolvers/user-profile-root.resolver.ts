import { Field, Mutation, ObjectType, Query, Resolver } from '@nestjs/graphql';
import { CreateUserProfileResultType } from '../models/results/create-user-profile-result.type';
import { GetUserProfileResultType } from '../models/results/get-user-profile-result.type';

@ObjectType()
export class UserProfileMutationType {
    @Field(() => CreateUserProfileResultType, {
        description: 'Create User Profile',
    })
    createUserProfile: CreateUserProfileResultType;
}

@ObjectType()
export class UserProfileQueryType {
    @Field(() => GetUserProfileResultType, {
        description: 'Get User Profile',
    })
    getUserProfile: GetUserProfileResultType;
}

@Resolver()
export class UserProfileRootResolver {
    @Mutation(() => UserProfileMutationType, {
        description: 'User Profile mutations',
    })
    userProfileMutations() {
        return {};
    }

    @Query(() => UserProfileQueryType, {
        description: 'User Profile queries',
    })
    userProfileQueries() {
        return {};
    }
}
