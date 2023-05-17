import { Injectable } from "@nestjs/common";
import { PrismaService } from "@app/common/services/prisma.service";
import { GetUserInputType } from "../models/input/get-user-input.type";
import { GetUserResultType } from "../models/results/get-user-result.type";
import { GetUsersInput } from "../models/input/get-users-input.type";
import { PaginationInput } from "@app/common/models/input/pagination-input.type";
import { GetUsersResult } from "../models/results/get-users-result.type";
import { paginationUtil } from "@app/common/utils/pagination-util";
import { UserCacheService } from "@app/common/cache/services/user-cache.service";
import { BanUserResult } from "../models/results/ban-user-result.type";
import { BanUserInput } from "../models/input/ban-user-input.type";
import { JwtPayload } from "../../auth/services/token.service";
import { UnbanUserInput } from "../models/input/unban-user-input.type";
import { UnbanUserResult } from "../models/results/unban-user-result.type";
import { UserHelper } from "./user.helper";
import { DeleteUserResult } from "../models/results/delete-user-result.type";
import { DeleteUserInput } from "../models/input/delete-user-input.type";
@Injectable()
export class UserService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly userCacheService: UserCacheService,
        private readonly userHelper: UserHelper
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
        });

        return { user }
    }

    async getUsers(
        input: GetUsersInput,
        pagination: PaginationInput
    ): Promise<GetUsersResult> {
        const users = await this.prismaService.user.findMany({
            where: input,
            ...paginationUtil(pagination)
        });
        
        return { users };
    }

    async banUser(
        input: BanUserInput,
        userJwt: JwtPayload
    ): Promise<BanUserResult> {
        const initiatorUser = await this.prismaService.user.findUniqueOrThrow({
            where: { id: userJwt.sub }
        });

        const userToBan = await this.prismaService.user.findUniqueOrThrow({
            where: input
        });

        const hasPrivilege = this.userHelper.checkRolePermission(initiatorUser, userToBan);

        if (!hasPrivilege || initiatorUser.status === 'BLOCKED' || initiatorUser.status === 'FROZEN' || initiatorUser.role === 'USER') {
            return { message: 'has no access', code: 1 };
        }

        const user = await this.prismaService.user.update({
            where: input,
            data: {
                status: 'BLOCKED',
                role: 'USER'
            }
        });

        if(!user) return { user, code: 1, message: 'cannot update user in db'}

        const cacheUpdUserStatus = await this.userCacheService.set(user.id, user);
        if (cacheUpdUserStatus !== 'OK') {
            return { user, code: 1, message: 'cannot update user cache'}
        }

        return { user }
    }

    async unbanUser(
        input: UnbanUserInput,
        userJwt: JwtPayload
    ): Promise<UnbanUserResult> {
        const initiatorUser = await this.prismaService.user.findUniqueOrThrow({
            where: {
                id: userJwt.sub
            }
        });

        const userToUnban = await this.prismaService.user.findUniqueOrThrow({
            where: input
        });

        const hasPrivilege = this.userHelper.checkRolePermission(initiatorUser, userToUnban);

        if(!hasPrivilege || initiatorUser.status !== 'ACTIVE') {
            return { message: 'has no access', code: 1 };
        }

        const user = await this.prismaService.user.update({
            where: input,
            data: {
                status: 'ACTIVE'
            }
        });

        const cacheUpdUserStatus = await this.userCacheService.set(user.id, user);
        if (cacheUpdUserStatus !== 'OK') {
            return { user, code: 1, message: 'cannot update user cache'}
        }

        return { user };
    }

    // TODO
    async deleteUser(
        input: DeleteUserInput,
        userJwt: JwtPayload
    ): Promise<DeleteUserResult> {
        const userToDelete = await this.prismaService.user.findUniqueOrThrow({
            where: input
        })

        if (userToDelete.id !== userJwt.sub) {
            const initiatorUser = await this.prismaService.user.findUniqueOrThrow({
                where: {
                    id: userJwt.sub
                }
            });

            if (initiatorUser.role !== 'ADMIN') return { code: 1, message: 'has no access' }
            await this.prismaService.user.delete({
                where: input
            })

            await this.userCacheService.delete(userToDelete.id);
        }

        return {};
    }
}