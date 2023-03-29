import { Module } from "@nestjs/common";
import { UserProfileMutationResolver } from "./resolvers/user-profile-mutation.resolver";
import { UserProfileQueryType, UserProfileRootResolver } from "./resolvers/user-profile-root.resolver";
import { UserProfileService } from "./services/user-profile.service";

@Module({
    imports: [],
    controllers: [],
    providers: [
        UserProfileRootResolver,
        UserProfileMutationResolver,
        UserProfileQueryType,
        UserProfileService
    ],
    exports: []
})
export class UserProfileModule {

}