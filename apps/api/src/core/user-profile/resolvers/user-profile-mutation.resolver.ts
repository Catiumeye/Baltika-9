import { UserProfileService } from '../services/user-profile.service';
import { CreateUserProfileResultType } from '../models/results/create-user-profile-result.type';
import { Args, ResolveField, Resolver } from '@nestjs/graphql';
import { UserProfileMutationType, UserProfileRootResolver } from './user-profile-root.resolver';
import { CreateUserProfileInputType } from '../models/input/create-user-profile-input.type';

@Resolver(UserProfileMutationType)
export class UserProfileMutationResolver extends UserProfileRootResolver {
    constructor(private userProfileService: UserProfileService) {
        super();
    }

    @ResolveField(() => CreateUserProfileResultType)
    async createUserProfile(
        @Args() input: CreateUserProfileInputType,
    ): Promise<CreateUserProfileResultType> {
        return await this.userProfileService.createUserProfile(input);
    }

}
