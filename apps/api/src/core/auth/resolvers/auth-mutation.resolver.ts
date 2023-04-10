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
import { IReqInfo, ReqInfo } from '@app/common/decorators/req-data.decorator';


@Resolver(AuthMutationType)
export class AuthMutationResolver extends AuthRootResolver {
    constructor(private authService: AuthService) {
        super();
    }

    @ResolveField(() => RegisterUserResultType)
    async register(
        @Args() input: RegisterUserInputType,
        @ReqInfo() reqInfo: IReqInfo,
    ): Promise<RegisterUserResultType> {
        return await this.authService.register(input, reqInfo);
    }

    @ResolveField(() => RegisterSocialResult)
    async registerSocial(
        @Args() input: RegisterSocialInput,
        @ReqInfo() reqInfo: IReqInfo,
    ): Promise<RegisterSocialResult> {        
        return await this.authService.registerSocial(input, reqInfo);
    }

    @ResolveField(() => LoginResultType)
    async login(
        @Args() input: LoginInputType,
        @ReqInfo() reqInfo: IReqInfo,
    ) {
        return await this.authService.login(input, reqInfo);
    }

    @ResolveField(() => LoginSocialResult)
    async loginSocial(
        @Args() input: LoginSocialInput,
        @ReqInfo() reqInfo: IReqInfo,
    ) {
        return await this.authService.loginSocial(input, reqInfo);
    }
}
