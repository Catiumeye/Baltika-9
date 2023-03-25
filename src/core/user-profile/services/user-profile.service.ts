import { Injectable } from "@nestjs/common";
import { PrismaService } from "common/services/prisma.service";
import { GraphQLResolveInfo } from "graphql";
import { CreateUserProfileInputType } from "../models/input/create-user-profile-input.type";
import { GetUserProfileInputType } from "../models/input/get-user-profile-input.type";
import { CreateUserProfileResultType } from "../models/results/create-user-profile-result.type";
import { GetUserProfileResultType } from "../models/results/get-user-profile-result.type";

@Injectable()
export class UserProfileService {
    constructor(
        private readonly prismaService: PrismaService,

    ) {}

    async getUserProfile(
        input: GetUserProfileInputType,
        info: GraphQLResolveInfo
    ): Promise<GetUserProfileResultType> {

        return ;
    }

    async createUserProfile(
        input: CreateUserProfileInputType
    ): Promise<CreateUserProfileResultType> {
        console.log(input);

        return ;
    }
}