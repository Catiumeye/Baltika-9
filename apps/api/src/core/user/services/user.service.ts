import { Injectable } from "@nestjs/common";
import { PasswordService } from "@app/common/services/password.service";
import { PrismaService } from "@app/common/services/prisma.service";
import { GraphQLResolveInfo } from "graphql";
import { RegisterUserInputType } from "../../auth/models/input/register-user-input.type";
import { GetUserInputType } from "../models/input/get-user-input.type";
import { RegisterUserResultType } from "../../auth/models/results/register-user-result.type";
import { GetUserResultType } from "../models/results/get-user-result.type";
import { fieldsMap } from 'graphql-fields-list';
@Injectable()
export class UserService {
    constructor(
        private readonly passwordService: PasswordService,
        private readonly prismaService: PrismaService,
    ) {}

    async getUser(
        input: GetUserInputType,
    ): Promise<GetUserResultType> {        
        const {id, username} = input;
        
        const user = await this.prismaService.user.findUnique({
            where: {
                id,
                username
            },
            include: {
                profile: true,
                avatars: {
                    include: {
                        file: true
                    }
                },
                files: true,
                auth: true
            }
        })

        return {user: user}
    }

    async createUser() {
        this.prismaService
    }
}