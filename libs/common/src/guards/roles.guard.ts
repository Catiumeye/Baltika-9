import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { GqlExecutionContext } from "@nestjs/graphql";
import { TRoles } from "../decorators/roles.decorator";



@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    async canActivate(context: ExecutionContext) {
        const ctx = GqlExecutionContext.create(context);
        const req = ctx.getContext().req;
        console.log(ctx.getContext().req.user)
        const roles = this.reflector.get<TRoles>('roles', context.getHandler());
        console.log(roles)
        return true;
    }
}