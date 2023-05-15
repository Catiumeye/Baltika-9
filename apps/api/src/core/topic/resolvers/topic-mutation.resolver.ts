import { TopicService } from '../services/topic.service';
import { Args, ID, Int, ResolveField, Resolver } from '@nestjs/graphql';
import { TopicMutationType, TopicRootResolver } from './topic-root.resolver';
import { CreateTopicCategoryInputType } from '../models/input/create-topic-category-input.type';
import { CreateTopicCategoryResultType } from '../models/results/create-topic-category-result.type';
import { CreateTopicResultType } from '../models/results/create-topic-result.type';
import { CreateTopicInputType } from '../models/input/create-topic-input.type';
import { CreateTopicCommentResult } from '../models/results/create-topic-comment-result.type';
import { CreateTopicCommentInput } from '../models/input/create-topic-comment-input.type';
import { UserData } from '@app/common/decorators/user-data.decorator';
import { AuthGuard } from '@app/common/guards/auth.guard';
import { SetMetadata, UseGuards } from '@nestjs/common';
import { JwtPayload } from '../../auth/services/token.service';
import { UserRole } from '@prisma/client';
import { RolePermission, Roles } from '@app/common/decorators/roles.decorator';
import { RoleGuard } from '@app/common/guards/roles.guard';

@Resolver(TopicMutationType)
export class TopicMutationResolver extends TopicRootResolver {
    constructor(private topicService: TopicService) {
        super();
    }

    @RolePermission(['USER', 'MODER', 'ADMIN'])
    @ResolveField(() => CreateTopicCategoryResultType)
    async createTopicCategory(
        @Args() input: CreateTopicCategoryInputType
    ): Promise<CreateTopicCategoryResultType> {
        console.log('CREATE CAT');
        
        return await this.topicService.createTopicCategory(input);
    }

    @RolePermission(['USER', 'MODER', 'ADMIN'])
    @ResolveField(() => CreateTopicResultType)
    async createTopic(
        @UserData() user: JwtPayload,
        @Args() input: CreateTopicInputType
    ): Promise<CreateTopicResultType> {
        return await this.topicService.createTopic(input);
    }

    @ResolveField(() => CreateTopicCommentResult)
    async createTopicComment(
        @Args() input: CreateTopicCommentInput
    ): Promise<CreateTopicCommentResult> {
        return await this.topicService.createTopicComment(input);
    }

    @RolePermission(null)
    async deleteTopic(
        @Args('id', {type: () => ID}) id: string,
        @UserData() user: JwtPayload
    ) {
        return await this.topicService.deleteTopic(id, user);
    }
}
