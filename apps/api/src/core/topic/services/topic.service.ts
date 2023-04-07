import { Injectable } from "@nestjs/common";
import { PrismaService } from "@app/common/services/prisma.service";
import { fieldsMap } from 'graphql-fields-list';
import { CreateTopicCategoryInputType } from "../models/input/create-topic-category-input.type";
import { CreateTopicInputType } from "../models/input/create-topic-input.type";
import { CreateTopicCategoryResultType } from "../models/results/create-topic-category-result.type";
import { CreateTopicResultType } from "../models/results/create-topic-result.type";
import { CreateTopicCommentInput } from "../models/input/create-topic-comment-input.type";
import { CreateTopicCommentResult } from "../models/results/create-topic-comment-result.type";
import { GetTopicResult } from "../models/results/get-topic-result.type";

@Injectable()
export class TopicService {
    constructor(
        private readonly prismaService: PrismaService,
    ) {}

    async getTopic(
        id: string
    ): Promise<GetTopicResult> {
        const topic = await this.prismaService.topic.findUnique({
            where: { id },
            include: {
                author: true,
                category: true,
                comments: {
                    where: {
                        parent_id: null
                    },
                    include: {
                        children: {
                            select: {
                                id: true,
                                message: true,
                                author: {
                                    select: {
                                        user: {
                                            select: {
                                                username: true
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        author: {
                            select: {
                                user: {
                                    select: { username: true }
                                }
                            }
                        }
                    },
                }
            }
        })
        
        return {topic}
    }

    async createTopicCategory(
        input: CreateTopicCategoryInputType
    ): Promise<CreateTopicCategoryResultType> {
        const topicCategory = await this.prismaService.topicCategory.create({
            data: input
        })

        return {topic_category: topicCategory}
    }

    async createTopic(
        input: CreateTopicInputType
    ): Promise<CreateTopicResultType> {
        const topic = await this.prismaService.topic.create({
            data: input
        })

        return {topic};
    }

    async createTopicComment(
        input: CreateTopicCommentInput
    ): Promise<CreateTopicCommentResult> {
        const comment = await this.prismaService.topicComment.create({
            data: {
                message: input.message,
                author_id: input.author_id,
                parent_id: input.parent_id,
                topic_id: input.topic_id
            },
            include: {
                author: true,
                topic: true,
                children: true,
            }
        })

        return {comment: comment}
    }
}