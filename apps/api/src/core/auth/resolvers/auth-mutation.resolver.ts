import { AuthService } from '../services/auth.service';
import { Args, ResolveField, Resolver } from '@nestjs/graphql';
import { RegisterUserResultType } from '../models/results/register-user-result.type';
import { RegisterUserInputType } from '../models/input/register-user-input.type';
import { AuthMutationType, AuthRootResolver } from './auth-root.resolver';
import { RegisterSocialInput } from '../models/input/register-social-input.type';
import { RegisterSocialResult } from '../models/results/register-social-result.type';


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
        console.log('input', input);
        
        return await this.authService.registerSocial(input);
    }
}
