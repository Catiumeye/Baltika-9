import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard, IAuthGuard } from "@nestjs/passport";
import { AuthType } from "@prisma/client";


@Injectable()
export class GoogleAuthGuard extends AuthGuard(AuthType.GOOGLE) {
    async canActivate(context: ExecutionContext) {
        const activate = (await super.canActivate(context)) as boolean;
        const request = context.switchToHttp().getRequest();
        await super.logIn(request);
        return activate;
    }
}