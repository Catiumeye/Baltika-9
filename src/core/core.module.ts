import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { TopicModule } from "./topic/topic.module";
import { UserProfileModule } from "./user-profile/user-profile.module";
import { UserModule } from "./user/user.module";


@Module({
    imports: [
        AuthModule,
        UserModule,
        UserProfileModule,
        TopicModule,
    ],
    exports: [
        AuthModule,
        UserModule,
        UserProfileModule,
        TopicModule,
    ]
})
export class CoreModule {}