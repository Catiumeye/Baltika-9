import { Args, ResolveField, Resolver } from "@nestjs/graphql";
import { GetUserInputType } from "../models/input/get-user-input.type";
import { GetUserResultType } from "../models/results/get-user-result.type";
import { UserService } from "../services/user.service";
import { UserQueryType, UserRootResolver } from "./user-root.resolver";

@Resolver(UserQueryType)
export class UserQueryResolver extends UserRootResolver {
    constructor(private userService: UserService) {
        super();
    }

    @ResolveField(() => GetUserResultType, {})
    async getUser(
        @Args() input: GetUserInputType,
    ): Promise<GetUserResultType> {        
        return await this.userService.getUser(input);
    }

}
