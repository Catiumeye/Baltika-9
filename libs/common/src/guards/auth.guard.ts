import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { JwtService } from "@nestjs/jwt";
import { StrategyConfigService } from "apps/api/src/core/auth/services/strategy-config.service";
import { JwtPayload } from "apps/api/src/core/auth/services/token.service";
import { Request } from "express";
import { JwtCommonService } from "../../../../apps/api/src/core/auth/services/jwt-common.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtCommonService: JwtCommonService,
    ) {}

    async canActivate(context: ExecutionContext) {      
        const ctx = GqlExecutionContext.create(context);
        const req = ctx.getContext().req as Request;
        
        const { user } = this.validate(req.headers.authorization);
        req.user = user;
        return !!user;
    }

    validate(authorization?: string) {
        const jwt = this.jwtCommonService.jwtExtract(authorization);
        if(!jwt) throw new UnauthorizedException();

        const [type, token] = jwt;
        
        const user = this.jwtCommonService.jwtAccessVerify(token);

        return { user: user };
    }
}