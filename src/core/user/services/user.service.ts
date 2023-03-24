import { Injectable } from "@nestjs/common";
import { PasswordService } from "common/services/password.service";
import { PrismaService } from "common/services/prisma.service";


@Injectable()
export class UserService {
    constructor(
        private readonly passwordService: PasswordService,
        private readonly prismaService: PrismaService,
    ) {}

    async getUser() {
        const res = await this.passwordService.hash('13e1')
        const ver = await this.passwordService.verify(res, '13e1')
        console.log('res', res);
        console.log('ver', ver);
        
    }

    async signup() {
        
    }

    async signin() {

    }
}