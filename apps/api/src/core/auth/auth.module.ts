import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "../user/user.module";
import { AuthMutationResolver } from "./resolvers/auth-mutation.resolver";
import { AuthQueryResolver } from "./resolvers/auth-query.resolver";
import { AuthRootResolver } from "./resolvers/auth-root.resolver";
import { AuthService } from "./services/auth.service";
import { GitHubAuthService } from "./services/github-auth.service";
import { GoogleAuthService } from "./services/google-auth.service";
import { StrategyConfigService } from "./services/strategy-config.service";
import { TokenService } from "./services/token.service";

@Module({
    imports: [
        UserModule,
        JwtModule.registerAsync({
            useClass: StrategyConfigService
        })
    ],
    controllers: [],
    providers: [
        AuthRootResolver,
        AuthMutationResolver,
        AuthQueryResolver,
        AuthService,
        TokenService,
        StrategyConfigService,
        GoogleAuthService,
        GitHubAuthService,

    ],
    exports: []
})
export class AuthModule {

}