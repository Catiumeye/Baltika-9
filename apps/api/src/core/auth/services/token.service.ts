import { PrismaService } from "@app/common/services/prisma.service";
import { RandomGeneratorService } from "@app/common/services/random-generator.service";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthType } from "@prisma/client";
import { User } from "../../user/user.entity";
import { StrategyConfigService } from "./strategy-config.service";





@Injectable()
export class TokenService {
    constructor(
        private readonly strategyConfigService: StrategyConfigService,
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService,
        private rndGen: RandomGeneratorService,
    ) {}

    private async registerToken(user_id: string): Promise<string> {
        const refresh_token = this.rndGen.genStrUpper(64);
        const session = await this.prismaService.authSession.create({
            data: {
                expired_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60),
                refresh_token: refresh_token,
                ip: '192.168.3.1',
                user_agent: 'Agent dalboeb',
                auth_id: user_id
            }
        })
        return session.refresh_token;
    }

    async createAuthTokens(user: User, authType: AuthType): Promise<{access_token: string; refresh_token: string}> {
        const access_token = await this.jwtService.signAsync({role: user.role}, {
            subject: user.id,
            privateKey: this.strategyConfigService.config.JWT.accessToken.privateKey,
            ...this.strategyConfigService.config.JWT.accessToken.signOptions
        });

        const refresh_token = await this.registerToken(user.id);
        
        return { access_token, refresh_token };
    }
}