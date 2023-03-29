import { AuthService } from '../services/auth.service';
import { Args, ResolveField, Resolver } from '@nestjs/graphql';
import { RegisterUserResultType } from '../models/results/register-user-result.type';
import { RegisterUserInputType } from '../models/input/register-user-input.type';
import { AuthMutationType, AuthRootResolver } from './auth-root.resolver';

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

}
