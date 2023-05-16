import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { TRoles } from "../decorators/roles.decorator";
import { Request } from "express";
import { UserRole } from "@prisma/client";
import { UserCacheService } from "../cache/services/user-cache.service";
import { JwtCommonService } from "apps/api/src/core/auth/services/jwt-common.service";
import { User } from "apps/api/src/core/user/user.entity";
import { PrismaService } from "../services/prisma.service";
import { JwtPayload } from "apps/api/src/core/auth/services/token.service";



@Injectable()
export class RoleGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly userCacheService: UserCacheService,
        private readonly prismaService: PrismaService,
        private readonly jwtCommonService: JwtCommonService,
    ) {}

    async canActivate(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        const req = ctx.getContext().req as Request;

        const user = req.user as JwtPayload;
        const uCache = await this.userCacheService.get<User>(user?.sub as string);

        const roles: TRoles = this.reflector.get<TRoles>('roles', context.getHandler());
        const blocked: boolean = this.reflector.get<boolean>('blocked', context.getHandler());
        
        if (!blocked) {
            if (user.status === 'BLOCKED' || user.status === 'FROZEN') return false;

            if (!uCache) {
                const userFromDB = await this.prismaService.user.findUniqueOrThrow({ where: { id: user.sub } });
                
                return (userFromDB.status !== 'BLOCKED' && userFromDB.status !== 'FROZEN'); 
            }

            if (uCache.status === 'BLOCKED' || uCache.status === 'FROZEN') return false; 
        }

        if (roles === null) return true;

        if (!roles.includes(user?.role as never)) return false;
        
        return true;
    }
}