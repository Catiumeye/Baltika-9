import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { GqlExecutionContext } from "@nestjs/graphql";
import { AuthGuard } from "@nestjs/passport";
import { AuthType } from "@prisma/client";
import * as jwt from 'jsonwebtoken';


// @Injectable()
// export class JwtAuthGuard implements CanActivate {
//     constructor(
//         private readonly configService: ConfigService
//     ) {

//     }
//     async canActivate(context: ExecutionContext) {
//         const ctx = GqlExecutionContext.create(context);
//         const req = ctx.getContext();
//         const auth = req.headers.authorization;
//         return !!await this.validateToken(auth);
//     }

//     async validateToken(auth: string) {
//         const [PREFIX, token] = auth.split(' ');
//         if (PREFIX !== 'Bearer') {
//             throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED)
//         }
//         return jwt.verify(token, this.configService.getOrThrow('ACCESS_TOKEN_PRIVATE'));
//     }
// }

@Injectable()
export class JwtAuthGuard extends AuthGuard(AuthType.JWT) {
    constructor(
        private readonly configService: ConfigService
    ) {
        super()
    }
    async canActivate(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        const req = ctx.getContext();
        const auth = req.headers.authorization;
        return !!await this.validateToken(auth);
    }

    async validateToken(auth: string) {
        const [PREFIX, token] = auth?.split(' ') || [];
        
        if (PREFIX !== 'Bearer') {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED)
        }
        return jwt.verify(token, this.configService.getOrThrow('ACCESS_TOKEN_PRIVATE'));
    }
}