import { Global, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PasswordService } from "./services/password.service";
import { PrismaService } from "./services/prisma.service";
import { RandomGeneratorService } from "./services/random-generator.service";


@Global()
@Module({
    imports: [],
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