import { UserService } from '../services/user.service';
import { CreateUserResultType } from '../models/results/create-user-result.type';
import { Args, ResolveField, Resolver } from '@nestjs/graphql';
import { UserMutationType, UserRootResolver } from './user-root.resolver';
import { CreateUserInputType } from '../models/input/create-user-input.type';

@Resolver(UserMutationType)
export class UserMutationResolver extends UserRootResolver {
    constructor(private userService: UserService) {
        super();
    }

    @ResolveField(() => CreateUserResultType)
    async createUser(
        @Args() input: CreateUserInputType
    ): Promise<CreateUserResultType> {
        console.log(input);
        
        return await this.userService.createUser(input);
    }

    // @ResolveField(() => User)
    // async deleteUser(
    //     @Args('id') id: string
    // ): Promise<number> {
    //     console.log(id);
        
    //     return 0;
    // }

}
