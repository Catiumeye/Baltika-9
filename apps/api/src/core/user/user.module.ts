import { Module } from "@nestjs/common";
import { UserMutationResolver } from "./resolvers/user-mutation.resolver";
import { UserQueryResolver } from "./resolvers/user-query.resolver";
import { UserRootResolver } from "./resolvers/user-root.resolver";
import { UserService } from "./services/user.service";
import { AuthModule } from "../auth/auth.module";


@Module({
    imports: [AuthModule],
    controllers: [],
    providers: [
        UserRootResolver,
        UserMutationResolver,
        UserQueryResolver,
        UserService
    ],
    exports: [UserService]
})
export class UserModule {

}