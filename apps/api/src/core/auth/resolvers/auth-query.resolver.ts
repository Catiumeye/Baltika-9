import { Args, ResolveField, Resolver } from "@nestjs/graphql";
import { LoginInputType } from "../models/input/login-input.type";
import { LoginResultType } from "../models/results/login-result.type";
import { AuthService } from "../services/auth.service";
import { AuthRootResolver, AuthQueryType } from "./auth-root.resolver";

@Resolver(AuthQueryType)
export class AuthQueryResolver extends AuthRootResolver {
    constructor(private authService: AuthService) {
        super();
    }


    @ResolveField(() => LoginResultType)
    async login(
        @Args() input: LoginInputType
    ) {
        return await this.authService.login(input);
    }
}
