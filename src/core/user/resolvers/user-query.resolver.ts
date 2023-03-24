import { Args, ResolveField, Resolver } from "@nestjs/graphql";
import { GetUserResultType } from "../results/get-user-result.type";
import { UserService } from "../services/user.service";
import { UserQueryType, UserRootResolver } from "./user-root.resolver";

@Resolver(UserQueryType)
export class UserQueryResolver extends UserRootResolver {
    constructor(private userService: UserService) {
        super();
    }

    @ResolveField(() => GetUserResultType, {})
    async getUser(
        @Args('id') id: string,
    ): Promise<GetUserResultType> {
        return await this.userService.getUser() as any;
    }

}
