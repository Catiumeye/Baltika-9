import { Global, Module } from "@nestjs/common";
import { PasswordService } from "./services/password.service";
import { PrismaService } from "./services/prisma.service";
import { RandomGeneratorService } from "./services/random-generator.service";
import { CacheModule } from "./cache/cache.module";
import { JwtCommonService } from "../../../apps/api/src/core/auth/services/jwt-common.service";


@Global()
@Module({
    imports: [
        CacheModule,
    ],
    providers: [
        PrismaService,
        PasswordService,
        RandomGeneratorService,
    ],
    exports: [
        PrismaService,
        PasswordService,
        RandomGeneratorService,
    ]
})
export class CommonModule {}