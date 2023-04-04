import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy, StrategyOptions, VerifiedCallback } from "passport-jwt";
import { StrategyConfigService } from "../services/strategy-config.service";
import { JwtPayload } from 'jsonwebtoken';
import { AuthType } from "@prisma/client";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, AuthType.JWT) {
    constructor(
        private readonly strategyConfigService: StrategyConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: strategyConfigService.config.JWT.accessToken.privateKey,
            ignoreExpiration: false
        } as StrategyOptions)
    }

    async validate(payload: JwtPayload, done: VerifiedCallback) {
        console.log('VALIDATE', payload);
        return done(new UnauthorizedException(), undefined);
        return { userId: payload.sub };
    }
}

// @Injectable()
// export class JwtStrategy implements CanActivate {
//     constructor(
//         private readonly strategyConfigService: StrategyConfigService,
//     ) {

//     }

//     async canActivate(context: ExecutionContext): Promise<boolean> {
//         const 
//         return true;
//     }

// }