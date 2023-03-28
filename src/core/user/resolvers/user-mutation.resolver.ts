import { UserService } from '../services/user.service';
import { RegisterUserResultType } from '../../auth/models/results/register-user-result.type';
import { Args, ResolveField, Resolver } from '@nestjs/graphql';
import { UserMutationType, UserRootResolver } from './user-root.resolver';
import { RegisterUserInputType } from '../../auth/models/input/register-user-input.type';

@Resolver(UserMutationType)
export class UserMutationResolver extends UserRootResolver {
    constructor(private userService: UserService) {
        super();
    }

    // @ResolveField(() => User)
    // async deleteUser(
    //     @Args('id') id: string
    // ): Promise<number> {
    //     console.log(id);
        
    //     return 0;
    // }

}
