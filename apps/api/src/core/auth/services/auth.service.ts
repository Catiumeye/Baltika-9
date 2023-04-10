import { HttpException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { isEmail } from "class-validator";
import { PasswordService } from "@app/common/services/password.service";
import { PrismaService } from "@app/common/services/prisma.service";
import { RandomGeneratorService } from "@app/common/services/random-generator.service";
import { fieldsMap } from 'graphql-fields-list';
import { LoginInputType } from "../models/input/login-input.type";
import { RegisterUserInputType } from "../models/input/register-user-input.type";
import { LoginResultType } from "../models/results/login-result.type";
import { RegisterUserResultType } from "../models/results/register-user-result.type";
import { UserService } from "../../user/services/user.service";
import { StrategyConfigService } from "./strategy-config.service";
import { GoogleAuthService } from "./google-auth.service";
import { RegisterSocialResult } from "../models/results/register-social-result.type";
import { AuthType, UserStatus } from "@prisma/client";
import { RegisterSocialInput } from "../models/input/register-social-input.type";
import { TokenService } from "./token.service";
import { GitHubAuthService } from "./github-auth.service";
import { AuthProviderService } from "./auth-provider.service";
import { LoginSocialInput } from "../models/input/login-social-input.type";
import { IReqInfo } from "@app/common/decorators/req-data.decorator";

@Injectable()
export class AuthService {
    constructor(
        private readonly passwordService: PasswordService,
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService,
        private readonly strategyConfigService: StrategyConfigService,
        private readonly tokenService: TokenService,
        private readonly authProviderService: AuthProviderService,
        protected rndGen: RandomGeneratorService,
    ) {}

    async register(
        input: RegisterUserInputType,
        reqInfo: IReqInfo
    ): Promise<RegisterUserResultType> {
        const notUnique = await this.prismaService.user.findFirst({
            where: {
                OR: [
                    {
                        username: {
                            equals: input.username,
                            mode: 'insensitive'
                        }
                    },
                    {
                        email: {
                            equals: input.email,
                            mode: 'insensitive'
                        }
                    }
                ]
            }
        })
        
        if(notUnique) return { ok: false, code: 3 };
        const hash = await this.passwordService.hash(input.password);

        const user = await this.prismaService.user.create({
            data: {...input, password: hash}
        })
        
        return {ok: true}
    }

    async login(
        input: LoginInputType,
        reqInfo: IReqInfo,
    ): Promise<LoginResultType> {
        const isMail = isEmail(input.username_or_email);
        
        const user = await this.prismaService.user.findFirst({
            where: {
                [isMail && 'email' || 'username'] : {
                    equals: input.username_or_email,
                    mode: 'insensitive'
                }
            }
        })
        if (!user) return {code: 2, message: 'Invalid user data'};

        const verified = await this.passwordService.verify(user.password as string, input.password);
        if (!verified) return {code: 2, message: 'Invalid user data'};

        const access_token = await this.jwtService.signAsync({role: user.role}, {
            subject: user.id,
            privateKey: this.strategyConfigService.config.JWT.accessToken.privateKey,
            ...this.strategyConfigService.config.JWT.accessToken.signOptions
        });
        
        return {access_token, refresh_token: ''};
    }

    async loginSocial(
        input: LoginSocialInput,
        reqInfo: IReqInfo
    ): Promise<LoginResultType> {
        const socAuthService = this.authProviderService.determineSocial(input.auth_type);
        
        if (!input.code) {
            const location = await socAuthService.receiveCode();
            return { location };
        }

        const { token_type, access_token } = await socAuthService.getCreditionals(input.code);
        const userData = await socAuthService.getUserInfo(token_type, access_token);

        const user = await this.prismaService.user.findFirst({
            where: {
                email: userData.email,
                auth: {
                    external_id: userData.external_id,
                    type: input.auth_type
                }
            },
            include: {
                auth: true
            }
        })
        
        if (!user) return { code: 2, message: 'incorrect data' };

        const tokens = await this.tokenService.createAuthTokens(user, reqInfo);

        return {access_token: tokens.access_token, refresh_token: tokens.refresh_token};
    }

    async registerSocial(
        input: RegisterSocialInput,
        reqInfo: IReqInfo
    ): Promise<RegisterSocialResult> {        
        const socAuthService = this.authProviderService.determineSocial(input.auth_type);
        if (!input.code) {
            const location = await socAuthService.receiveCode();
            return { location };
        }
        
        const { token_type, access_token } = await socAuthService.getCreditionals(input.code);
        const userData = await socAuthService.getUserInfo(token_type, access_token);

        const coincidence = await this.prismaService.user.findFirst({
            where: {
                OR: [
                    {
                        username: {
                            equals: input.user_data.username,
                            mode: 'insensitive'
                        }
                    },
                    {
                        email: {
                            equals: userData.email,
                            mode: 'insensitive'
                        }
                    }
                ]
            }
        })

        if(coincidence) {
            return {code: 3, message: 'Same user already exists'}
        }

        const avatars = input.user_data.include_avatar ? {create: {url: userData.avatar}} : undefined;
        const user = await this.prismaService.user.create({
            data: {
                username: input.user_data.username,
                email: userData.email,
                status: UserStatus.ACTIVE,
                auth: {
                    create: {
                        type: input.auth_type,
                        external_id: userData.external_id,
                    }
                },
                profile: {
                    create: {
                        avatars
                    }
                }
            },
            include: {
                auth: true,
                profile: true
            }
        })

        const tokens = await this.tokenService.createAuthTokens(user, reqInfo);

        return { access_token: tokens.access_token, refresh_token: tokens.refresh_token };
    }
}