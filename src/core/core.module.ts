import { Module } from "@nestjs/common";
import { TopicModule } from "./topic/topic.module";
import { UserProfileModule } from "./user-profile/user-profile.module";
import { UserModule } from "./user/user.module";


@Module({
    imports: [
        UserModule,
        UserProfileModule,
        TopicModule,
    ],
    exports: [
        UserModule,
        UserProfileModule,
        TopicModule,
    ]
})
export class CoreModule {}