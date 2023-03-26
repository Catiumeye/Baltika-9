import { UserService } from '../services/user.service';
import { RegisterUserResultType } from '../models/results/register-user-result.type';
import { Args, ResolveField, Resolver } from '@nestjs/graphql';
import { UserMutationType, UserRootResolver } from './user-root.resolver';
import { RegisterUserInputType } from '../models/input/create-user-input.type';

@Resolver(UserMutationType)
export class UserMutationResolver extends UserRootResolver {
    constructor(private userService: UserService) {
        super();
    }

    @ResolveField(() => RegisterUserResultType)
    async register(
        @Args() input: RegisterUserInputType
    ): Promise<RegisterUserResultType> {
        return await this.userService.register(input);
    }

    // @ResolveField(() => User)
    // async deleteUser(
    //     @Args('id') id: string
    // ): Promise<number> {
    //     console.log(id);
        
    //     return 0;
    // }

}
