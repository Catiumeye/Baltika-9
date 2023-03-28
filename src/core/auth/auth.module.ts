import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AuthMutationResolver } from "./resolvers/auth-mutation.resolver";
import { AuthQueryResolver } from "./resolvers/auth-query.resolver";
import { AuthRootResolver } from "./resolvers/auth-root.resolver";
import { AuthService } from "./services/auth.service";


@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET
        })
    ],
    controllers: [],
    providers: [
        AuthRootResolver,
        AuthMutationResolver,
        AuthQueryResolver,
        AuthService
    ],
    exports: []
})
export class AuthModule {

}