import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { JwtService } from "@nestjs/jwt";
import { StrategyConfigService } from "apps/api/src/core/auth/services/strategy-config.service";
import { JwtPayload } from "apps/api/src/core/auth/services/token.service";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly stategyConf: StrategyConfigService
    ) {}

    async canActivate(context: ExecutionContext) {      
        const ctx = GqlExecutionContext.create(context);
        const req = ctx.getContext().req as Request;
        
        const { user } = this.validate(req.headers.authorization);
        req.user = user;
        return !!user;
    }

    validate(authorization?: string) {
        if (!authorization) throw new UnauthorizedException();
        const [type, token] = authorization.split(' ');
        if (type !== 'Bearer') throw new UnauthorizedException();
        
        const user = this.jwtService.verify<JwtPayload>(token, {
            publicKey: this.stategyConf.config.JWT.accessToken.publicKey,
        });

        return { user: user }
    }
}