import { Args, Info, ResolveField, Resolver } from "@nestjs/graphql";
import { GraphQLResolveInfo } from "graphql";
import { GetUserProfileInputType } from "../models/input/get-user-profile-input.type";
import { GetUserProfileResultType } from "../models/results/get-user-profile-result.type";
import { UserProfileService } from "../services/user-profile.service";
import { UserProfileQueryType, UserProfileRootResolver } from "./user-profile-root.resolver";

@Resolver(UserProfileQueryType)
export class UserQueryResolver extends UserProfileRootResolver {
    constructor(private userService: UserProfileService) {
        super();
    }

    @ResolveField(() => GetUserProfileResultType, {})
    async getUserProfile(
        @Args() input: GetUserProfileInputType,
        @Info() info: GraphQLResolveInfo
    ): Promise<GetUserProfileResultType> {
        return await this.userService as any;
    }

}
