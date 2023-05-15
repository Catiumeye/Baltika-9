import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { StrategyConfigService } from "apps/api/src/core/auth/services/strategy-config.service";
import { JwtPayload } from "apps/api/src/core/auth/services/token.service";



@Injectable()
export class JwtCommonService {
    constructor(
        private readonly stategyConf: StrategyConfigService,
        private readonly jwtService: JwtService,
    ) {}

    jwtExtract (authorization?: string): [string, string] | undefined {
        if (!authorization) return undefined;
        const [type, token] = authorization.split(' ');
    
        if (type !== 'Bearer' || !token) return undefined;
    
        return [type, token];
    }

    jwtAccessVerify(token: string): JwtPayload {
        return this.jwtService.verify<JwtPayload>(token, {
            publicKey: this.stategyConf.config.JWT.accessToken.publicKey,
        });
    }
}