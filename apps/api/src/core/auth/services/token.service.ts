import { IReqInfo } from "@app/common/decorators/req-data.decorator";
import { PrismaService } from "@app/common/services/prisma.service";
import { RandomGeneratorService } from "@app/common/services/random-generator.service";
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthType, UserRole, UserStatus } from "@prisma/client";
import { User } from "../../user/user.entity";
import { StrategyConfigService } from "./strategy-config.service";


export enum TokenType {
    'ACCESS_JWT' = 'ACCESS_JWT',
    'REFRESH_JWT' = 'REFRESH_JWT'
}

export interface JwtPayload {
    type: TokenType; // token type
    role: UserRole; // user role
    status: UserStatus, // user status
    sub: string; // user id
    exp: number; // expires in
}


@Injectable()
export class TokenService {
    constructor(
        private readonly strategyConfigService: StrategyConfigService,
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService,
    ) {}

    private async registerToken(user: User, reqInfo: IReqInfo): Promise<string> {
        const { publicKey, signOptions } = this.strategyConfigService.config.JWT.refreshToken;
        
        const refresh_token = this.jwtService.sign({ type: TokenType.REFRESH_JWT, role: user.role, sub: user.id } as JwtPayload, 
            signOptions
        )
        const {ip, ...metadata} = reqInfo;
        const session = await this.prismaService.session.create({
            data: {
                refresh_token: refresh_token,
                ip: ip,
                metadata: metadata,
                user_id: user.id as string,
                is_used: false
            }
        })
        return session.refresh_token;
    }

    async createAuthTokens(user: User, reqInfo: IReqInfo): Promise<{access_token: string; refresh_token: string}> {
        const access_token = await this.jwtService.signAsync({ 
            type: TokenType.ACCESS_JWT,
            role: user.role,
            status: user.status,
            sub: user.id,
        } as JwtPayload);
        
        const refresh_token = await this.registerToken(user, reqInfo);
        
        return { access_token, refresh_token };
    }
}