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
import { AuthType } from "@prisma/client";
import { RegisterSocialInput } from "../models/input/register-social-input.type";
import { TokenService } from "./token.service";

@Injectable()
export class AuthService {
    constructor(
        private readonly passwordService: PasswordService,
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService,
        private readonly strategyConfigService: StrategyConfigService,
        private readonly googleAuthService: GoogleAuthService,
        private readonly tokenService: TokenService,
        protected rndGen: RandomGeneratorService,
    ) {}

    async register(
        input: RegisterUserInputType
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
        input: LoginInputType
    ): Promise<LoginResultType> {
        this.jwtService
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

    async registerSocial(input: RegisterSocialInput): Promise<RegisterSocialResult> {        
        if (!input.code) {
            const location = await this.googleAuthService.receiveCode();
            return { location };
        }
        
        const {token_type, access_token} = await this.googleAuthService.getCreditionals(input.code);
        
        const userData = await this.googleAuthService.getUserInfo(token_type, access_token)
        console.log('userData', userData);
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

        const avatars = input.user_data.include_avatar ? {create: {url: userData.picture}} : undefined;
        const user = await this.prismaService.user.create({
            data: {
                username: input.user_data.username,
                email: userData.email,
                avatars,
                auth: {
                    create: {
                        type: input.auth_type,
                        external_id: userData.sub,
                    }
                },
                profile: {
                    create: {

                    }
                }
            },
            include: {
                avatars: true,
                auth: true,
                profile: true
            }
        })

        const tokens = await this.tokenService.createAuthTokens(user, input.auth_type)

        return { access_token: tokens.access_token, refresh_token: tokens.refresh_token };
    }
}