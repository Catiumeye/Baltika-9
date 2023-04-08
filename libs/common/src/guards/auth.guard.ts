import { CanActivate, ExecutionContext, Inject, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { JwtService } from "@nestjs/jwt";
import { StrategyConfigService } from "apps/api/src/core/auth/services/strategy-config.service";



@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly stategyConf: StrategyConfigService
    ) {}

    async canActivate(context: ExecutionContext) {      
        const ctx = GqlExecutionContext.create(context);
        const req = ctx.getContext().req;
        
        const { ok, user } = this.validate(req.headers.authorization);
        req.user = user;
        return ok;
    }

    validate(authorization?: string) {
        if (!authorization) return { ok: false };
        const [type, token] = authorization.split(' ');
        if (type !== 'Bearer') return { ok: false };

        const user = this.jwtService.decode(token);
        
        this.jwtService.verify(token, {
            publicKey: this.stategyConf.config.JWT.accessToken.publicKey,
        });

        return { ok: true, user }
    }
}