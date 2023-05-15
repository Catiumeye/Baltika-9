import { Injectable } from "@nestjs/common";
import { PasswordService } from "@app/common/services/password.service";
import { PrismaService } from "@app/common/services/prisma.service";
import { GraphQLResolveInfo } from "graphql";
import { RegisterUserInputType } from "../../auth/models/input/register-user-input.type";
import { GetUserInputType } from "../models/input/get-user-input.type";
import { RegisterUserResultType } from "../../auth/models/results/register-user-result.type";
import { GetUserResultType } from "../models/results/get-user-result.type";
import { fieldsMap } from 'graphql-fields-list';
import { GetUsersInput } from "../models/input/get-users-input.type";
import { PaginationInput } from "@app/common/models/input/pagination-input.type";
import { GetUsersResult } from "../models/results/get-users-result.type";
import { paginationUtil } from "@app/common/utils/pagination-util";
import { isEmail, isUUID } from "class-validator";
import { UserCacheService } from "@app/common/cache/services/user-cache.service";
import { BanUserResult } from "../models/results/ban-user-result.type";
import { BanUserInput } from "../models/input/ban-user-input.type";
@Injectable()
export class UserService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly userCacheService: UserCacheService
    ) {}

    async getUser(
        input: GetUserInputType,
    ): Promise<GetUserResultType> {        
        const {id, username} = input;
        
        const user = await this.prismaService.user.findUnique({
            where: {
                id,
                username,
            },
            include: {
                profile: {
                    include: {
                        avatars: {
                            include: {
                                file: true
                            }
                        }
                    }
                },
                files: true,
                auth: true
            }
        })

        return {user: user}
    }

    async getUsers(
        input: GetUsersInput,
        pagination: PaginationInput
    ): Promise<GetUsersResult> {
        const users = await this.prismaService.user.findMany({
            where: input,
            ...paginationUtil(pagination)
        })
        
        return { users };
    }

    async banUser(
        input: BanUserInput
    ): Promise<BanUserResult> {
        const user = await this.prismaService.user.update({
            where: input,
            data: {
                status: 'BLOCKED'
            }
        })

        if(!user) return { user, code: 1, message: 'cannot update user in db'}

        const cacheUpdUserStatus = await this.userCacheService.set(user.id, user);
        if (cacheUpdUserStatus !=="OK") {
            return { user, code: 1, message: 'cannot update user cache'}
        }

        return { user }
    }
}