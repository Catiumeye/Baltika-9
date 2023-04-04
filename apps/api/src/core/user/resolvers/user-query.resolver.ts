import { JwtAuthGuard } from "@app/common/guards/jwt-auth.guard";
import { ExecutionContext, UseGuards } from "@nestjs/common";
import { Args, Context, GraphQLExecutionContext, ResolveField, Resolver } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";
import { AuthType } from "@prisma/client";
import { GetUserInputType } from "../models/input/get-user-input.type";
import { GetUserResultType } from "../models/results/get-user-result.type";
import { UserService } from "../services/user.service";
import { UserQueryType, UserRootResolver } from "./user-root.resolver";
import { GoogleAuthGuard } from "@app/common/guards/google-auth.guard";
import { AuthMiddleware } from "@app/common/middlewares/auth.middleware";

import { createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Profile } from "passport";

@Resolver(UserQueryType)
export class UserQueryResolver extends UserRootResolver {
    constructor(private userService: UserService) {
        super();
    }

    @UseGuards(JwtAuthGuard)
    @ResolveField(() => GetUserResultType, {
        middleware: [AuthMiddleware]
    })
    async getUser(
        @Args() input: GetUserInputType,
        
    ): Promise<GetUserResultType> {                
        return await this.userService.getUser(input);
    }

}
