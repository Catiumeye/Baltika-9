import { Module } from "@nestjs/common";
import { UserMutationResolver } from "./resolvers/user-mutation.resolver";
import { UserQueryResolver } from "./resolvers/user-query.resolver";
import { UserMutationType, UserRootResolver } from "./resolvers/user-root.resolver";
import { UserService } from "./services/user.service";


@Module({
    imports: [],
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