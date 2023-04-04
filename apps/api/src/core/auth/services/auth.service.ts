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

@Injectable()
export class AuthService {
    constructor(
        private readonly passwordService: PasswordService,
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService,
        private readonly strategyConfigService: StrategyConfigService,
        private readonly googleAuthService: GoogleAuthService,
        protected rndGen: RandomGeneratorService,
    ) {}

    // private async registerToken(uid: string): Promise<string> {
    //     const refresh_token = this.rndGen.genStrUpper(64);
    //     const userToken = await this.prismaService.userToken.create({
    //         data: {
    //             refresh_token,
    //             user_id: uid,
    //             expired_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60)
    //         }
    //     });
    //     return userToken.refresh_token;
    // }

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

        const verified = await this.passwordService.verify(user.password, input.password);
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

        return { access_token: '', location: '' };
    }
}