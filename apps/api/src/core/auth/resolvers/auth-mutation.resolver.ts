import { AuthService } from '../services/auth.service';
import { Args, ResolveField, Resolver } from '@nestjs/graphql';
import { RegisterUserResultType } from '../models/results/register-user-result.type';
import { RegisterUserInputType } from '../models/input/register-user-input.type';
import { AuthMutationType, AuthRootResolver } from './auth-root.resolver';
import { RegisterSocialInput } from '../models/input/register-social-input.type';
import { RegisterSocialResult } from '../models/results/register-social-result.type';
import { LoginInputType } from '../models/input/login-input.type';
import { LoginResultType } from '../models/results/login-result.type';
import { LoginSocialInput } from '../models/input/login-social-input.type';
import { LoginSocialResult } from '../models/results/login-social-result.type';


@Resolver(AuthMutationType)
export class AuthMutationResolver extends AuthRootResolver {
    constructor(private authService: AuthService) {
        super();
    }

    @ResolveField(() => RegisterUserResultType)
    async register(
        @Args() input: RegisterUserInputType
    ): Promise<RegisterUserResultType> {
        return await this.authService.register(input);
    }

    @ResolveField(() => RegisterSocialResult)
    async registerSocial(
        @Args() input: RegisterSocialInput
    ): Promise<RegisterSocialResult> {        
        return await this.authService.registerSocial(input);
    }

    @ResolveField(() => LoginResultType)
    async login(
        @Args() input: LoginInputType
    ) {
        return await this.authService.login(input);
    }

    @ResolveField(() => LoginSocialResult)
    async loginSocial(
        @Args() input: LoginSocialInput
    ) {
        return await this.authService.loginSocial(input);
    }
}
