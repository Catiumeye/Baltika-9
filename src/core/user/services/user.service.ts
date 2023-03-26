import { Injectable } from "@nestjs/common";
import { PasswordService } from "common/services/password.service";
import { PrismaService } from "common/services/prisma.service";
import { GraphQLResolveInfo } from "graphql";
import { RegisterUserInputType } from "../models/input/create-user-input.type";
import { GetUserInputType } from "../models/input/get-user-input.type";
import { RegisterUserResultType } from "../models/results/register-user-result.type";
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
                user_profile: true,
                avatar: {
                    include: {
                        file: true
                    }
                }
            }
        })

        return {user: user}
    }

    async register(
        input: RegisterUserInputType
    ): Promise<RegisterUserResultType> {
        const hash = await this.passwordService.hash(input.password);
        const user = await this.prismaService.user.create({
            data: {...input, password: hash}
        })
        
        return {ok: true}
    }

    async verify(

    ): Promise<void> {

    }
}