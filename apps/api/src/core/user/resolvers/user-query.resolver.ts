
import { Args, ResolveField, Resolver } from "@nestjs/graphql";
import { GetUserInputType } from "../models/input/get-user-input.type";
import { GetUserResultType } from "../models/results/get-user-result.type";
import { UserService } from "../services/user.service";
import { UserQueryType, UserRootResolver } from "./user-root.resolver";
import { GetUsersInput } from "../models/input/get-users-input.type";
import { PaginationInput } from "@app/common/models/input/pagination-input.type";
import { GetUsersResult } from "../models/results/get-users-result.type";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "@app/common/guards/auth.guard";

@Resolver(UserQueryType)
export class UserQueryResolver extends UserRootResolver {
    constructor(private userService: UserService) {
        super();
    }

    @ResolveField(() => GetUserResultType)
    async getUser(
        @Args() input: GetUserInputType,
    ): Promise<GetUserResultType> {                
        return await this.userService.getUser(input);
    }

    // @UseGuards(AuthGuard)
    @ResolveField(() => GetUsersResult)
    async getUsers(
        @Args() input: GetUsersInput,
        @Args() pagination: PaginationInput
    ): Promise<GetUsersResult> {
        return await this.userService.getUsers(input, pagination);
    }
}
