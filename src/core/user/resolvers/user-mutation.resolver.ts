import { UserService } from '../services/user.service';
import { CreateUserResultType } from '../results/create-user-result.type';
import { ResolveField, Resolver } from '@nestjs/graphql';
import { UserMutationType, UserRootResolver } from './user-root.resolver';

@Resolver(UserMutationType)
export class UserCollectionMutationResolver extends UserRootResolver {
    constructor(private userService: UserService) {
        super();
    }

    @ResolveField(() => CreateUserResultType, {})
    async createUserCollection(

    ): Promise<CreateUserResultType> {
        return await this.userService as any;
    }

}
