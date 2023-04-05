import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModuleOptions, JwtOptionsFactory } from "@nestjs/jwt";
import { AuthType } from "@prisma/client";

@Injectable()
export class StrategyConfigService implements JwtOptionsFactory {
    public config: { [key in keyof typeof AuthType]: any };

    constructor(
        private configService: ConfigService
    ) {        
        this.config = {
            JWT: {
                accessToken: {
                    privateKey: this.configService.getOrThrow('ACCESS_TOKEN_PRIVATE'),
                    signOptions: {
                        expiresIn: this.configService.getOrThrow('ACCESS_TOKEN_PRIVATE_EXP_IN'),
                        noTimestamp: true,
                    },
                },
            },
            GOOGLE: {
                clientID: this.configService.getOrThrow('GOOGLE_CLIENT_ID'),
                clientSecret: this.configService.getOrThrow('GOOGLE_CLIENT_SECRET'),
                redirectURL: this.configService.getOrThrow('GOOGLE_REDIRECT_URL'),
                endpointURL: this.configService.getOrThrow('GOOGLE_ENDPOINT'),
            },
            GITHUB: {
                clientID: this.configService.getOrThrow('GITHUB_CLIENT_ID'),
                clientSecret: this.configService.getOrThrow('GITHUB_CLIENT_SECRET'),
                redirectURL: this.configService.getOrThrow('GITHUB_REDIRECT_URL'),
                endpointURL: this.configService.getOrThrow('GITHUB_ENDPOINT'),
            }
        }
    }

    createJwtOptions(): JwtModuleOptions | Promise<JwtModuleOptions> {
        return this.config.JWT.accessToken;
    }
}