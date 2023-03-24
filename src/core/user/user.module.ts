import { Module } from "@nestjs/common";
import { UserQueryResolver } from "./resolvers/user-query.resolver";
import { UserMutationType, UserRootResolver } from "./resolvers/user-root.resolver";
import { UserService } from "./services/user.service";


@Module({
    imports: [],
    controllers: [],
    providers: [
        UserRootResolver,
        UserQueryResolver,
        UserMutationType,
        UserService
    ],
    exports: []
})
export class UserModule {

}