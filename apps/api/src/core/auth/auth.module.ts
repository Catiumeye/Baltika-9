import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "../user/user.module";
import { AuthMutationResolver } from "./resolvers/auth-mutation.resolver";
import { AuthQueryResolver } from "./resolvers/auth-query.resolver";
import { AuthRootResolver } from "./resolvers/auth-root.resolver";
import { AuthService } from "./services/auth.service";
import { StrategyConfigService } from "./services/strategy-config.service";
import { GoogleStrategy } from "./strategies/google.strategy";
import { JwtStrategy } from "./strategies/jwt.strategy";


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
        StrategyConfigService,
        JwtStrategy,
        GoogleStrategy,
    ],
    exports: []
})
export class AuthModule {

}