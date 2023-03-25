import { Module } from "@nestjs/common";
import { UserProfileModule } from "./user-profile/user-profile.module";
import { UserModule } from "./user/user.module";


@Module({
    imports: [
        UserModule,
        UserProfileModule,
    ],
    exports: [
        UserModule,
        UserProfileModule,
    ]
})
export class CoreModule {}