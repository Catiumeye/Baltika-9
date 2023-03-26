import { Injectable } from "@nestjs/common";
import { PasswordService } from "common/services/password.service";
import { PrismaService } from "common/services/prisma.service";
import { fieldsMap } from 'graphql-fields-list';
import { CreateTopicCategoryInputType } from "../models/input/create-topic-category-input.type";
import { CreateTopicInputType } from "../models/input/create-topic-input.type";
import { CreateTopicCategoryResultType } from "../models/results/create-topic-category-result.type";
import { CreateTopicResultType } from "../models/results/create-topic-result.type";

@Injectable()
export class TopicService {
    constructor(
        private readonly passwordService: PasswordService,
        private readonly prismaService: PrismaService,
    ) {}

    async createTopicCategory(
        input: CreateTopicCategoryInputType
    ): Promise<CreateTopicCategoryResultType> {
        return;
    }

    async createTopic(
        input: CreateTopicInputType
    ): Promise<CreateTopicResultType> {
        return;
    }
}